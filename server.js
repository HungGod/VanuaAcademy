const express = require('express');
const path = require('path');
const geoip = require('geoip-lite');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Course data
const courses = [
  {
    name: 'Certificate in Massage Therapy Level III',
    duration: '3 months (1-month inhouse training and 2 months extended workplace training)',
    price: 2000
  },
  {
    name: 'Certificate in Beauty & Spa Therapy Level IV (Fiji Certificate)',
    duration: '5 months',
    price: 6000
  },
  {
    name: 'Certificate in Level III & IV (Combined)',
    duration: '6 months',
    price: 7000
  },
  {
    name: 'Certificate in Nail Technology Level II',
    duration: '3 months (1-month inhouse training and 2 months extended workplace training)',
    price: 2900
  }
];

const INTERNATIONAL_FEE = 1500; // FJD

// Helper function to get user IP address
function getUserIP(req) {
  // Handle various proxy headers
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ips = forwarded.split(',');
    return ips[0].trim();
  }
  
  // Handle other common proxy headers
  if (req.headers['x-real-ip']) {
    return req.headers['x-real-ip'];
  }
  
  // Fallback to connection remote address
  if (req.connection && req.connection.remoteAddress) {
    return req.connection.remoteAddress;
  }
  
  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }
  
  // Default for localhost
  return '127.0.0.1';
}

// Helper function to get currency code from country
function getCurrencyCode(country) {
  const currencyMap = {
    'US': 'USD',
    'GB': 'GBP',
    'AU': 'AUD',
    'NZ': 'NZD',
    'CA': 'CAD',
    'JP': 'JPY',
    'CN': 'CNY',
    'IN': 'INR',
    'SG': 'SGD',
    'HK': 'HKD',
    'KR': 'KRW',
    'FJ': 'FJD'
  };
  
  // Handle EU countries
  const euCountries = ['AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK'];
  if (euCountries.includes(country)) {
    return 'EUR';
  }
  
  return currencyMap[country] || 'USD';
}

// Helper function to format currency
function formatCurrency(amount, currencyCode) {
  const symbols = {
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'NZD': 'NZ$',
    'CNY': '¥',
    'INR': '₹',
    'SGD': 'S$',
    'HKD': 'HK$',
    'KRW': '₩',
    'FJD': 'FJ$'
  };
  const symbol = symbols[currencyCode] || currencyCode;
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Currency conversion function - converts FJD to target currency
async function convertCurrencyFJD(amountFJD, targetCurrency) {
  try {
    // Using exchangerate-api.com free tier (no API key required for basic usage)
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/FJD`);
    const rates = response.data.rates;
    
    if (!rates[targetCurrency]) {
      console.warn(`Currency ${targetCurrency} not found, using USD`);
      return amountFJD * (rates['USD'] || 1);
    }
    
    return amountFJD * rates[targetCurrency];
  } catch (error) {
    console.error('Currency conversion error:', error.message);
    // Fallback: Use approximate rates if API fails
    const fallbackRates = {
      'USD': 0.45,
      'GBP': 0.35,
      'EUR': 0.41,
      'AUD': 0.68,
      'NZD': 0.73,
      'CAD': 0.61,
      'JPY': 67,
      'CNY': 3.2,
      'INR': 37,
      'SGD': 0.61,
      'HKD': 3.5,
      'KRW': 600
    };
    return amountFJD * (fallbackRates[targetCurrency] || fallbackRates['USD']);
  }
}

// Main route
app.get('/', async (req, res) => {
  try {
    const userIP = getUserIP(req);
    const geo = geoip.lookup(userIP);
    const country = geo ? geo.country : 'US'; // Default to US if can't determine
    const isFiji = country === 'FJ';
    
    let courseData = courses.map(course => ({ ...course }));
    
    if (!isFiji) {
      // International user - convert prices
      const targetCurrency = getCurrencyCode(country);
      
      // Convert international fee from USD to target currency
      const internationalFee = await convertCurrencyFJD(INTERNATIONAL_FEE, targetCurrency);
      
      // Convert each course price from FJD to target currency and add international fee
      for (let course of courseData) {
        const originalPriceFJD = course.price;
        const convertedPrice = await convertCurrencyFJD(originalPriceFJD, targetCurrency);
        course.price = convertedPrice + internationalFee;
        course.currency = targetCurrency;
        course.originalPriceFJD = originalPriceFJD; // Store original for reference
        course.internationalFee = internationalFee;
      }
    } else {
      // Fijian user - keep FJD prices
      for (let course of courseData) {
        course.currency = 'FJD';
      }
    }
    
    res.render('index', {
      courses: courseData,
      isFiji,
      location: 'Nukubalavu Road, Savusavu, Fiji',
      email: 'Info@vanuaacademy.com',
      phone: '+(679)000-0000',
      formatCurrency: formatCurrency
    });
  } catch (error) {
    console.error('Error rendering page:', error);
    // Fallback: render with FJD prices if there's an error
    res.render('index', {
      courses: courses.map(c => ({ ...c, currency: 'FJD' })),
      isFiji: true,
      location: 'Nukubalavu Road, Savusavu, Fiji',
      email: 'Info@vanuaacademy.com',
      phone: '+(679)000-0000',
      formatCurrency: formatCurrency
    });
  }
});

app.listen(PORT, () => {
  console.log(`VanuaAcademy server running on http://localhost:${PORT}`);
});

