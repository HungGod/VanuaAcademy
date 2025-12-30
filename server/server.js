import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import validator from 'validator';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { validateEmail, validatePhone } from './validator.js';

// Load environment variables
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '..', 'db.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://vanuaacademy.com'
    : '*',
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Prevent huge payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize Firebase Admin
try {
  // Try to get service account from environment variable (JSON string)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized with FIREBASE_SERVICE_ACCOUNT');
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // If GOOGLE_APPLICATION_CREDENTIALS is set, Firebase Admin will use it automatically
    admin.initializeApp();
    console.log('Firebase Admin initialized with GOOGLE_APPLICATION_CREDENTIALS');
  } else {
    throw new Error('Firebase service account not configured');
  }
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  console.error('Please set FIREBASE_SERVICE_ACCOUNT (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (file path) in db.env');
  process.exit(1);
}

// Get Firestore instance
const db = admin.firestore();

// Rate limiting - track submissions by email/phone and IP
const recentSubmissions = new Map(); // email/phone -> timestamp
const submissionsByIP = new Map(); // IP -> array of timestamps
const SUBMISSION_COOLDOWN = 60000; // 60 seconds
const IP_RATE_LIMIT = 3; // Max 3 submissions per hour per IP
const IP_RATE_WINDOW = 3600000; // 1 hour

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  
  // Clean up email/phone submissions
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > SUBMISSION_COOLDOWN) {
      recentSubmissions.delete(key);
    }
  }
  
  // Clean up IP submissions
  for (const [ip, timestamps] of submissionsByIP.entries()) {
    const recentTimestamps = timestamps.filter(time => now - time < IP_RATE_WINDOW);
    if (recentTimestamps.length === 0) {
      submissionsByIP.delete(ip);
    } else {
      submissionsByIP.set(ip, recentTimestamps);
    }
  }
}, 5 * 60 * 1000);

// Enrollment API endpoint
app.post('/api/enroll', async (req, res) => {
  try {
    const { website, firstName, lastName, contactMethod, contactInfo, certificates } = req.body;

    // Get client IP for rate limiting
    const clientIP = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();

    // IP-based rate limiting (first line of defense)
    if (!submissionsByIP.has(clientIP)) {
      submissionsByIP.set(clientIP, []);
    }
    
    const ipSubmissions = submissionsByIP.get(clientIP);
    const recentIPSubmissions = ipSubmissions.filter(time => now - time < IP_RATE_WINDOW);
    
    if (recentIPSubmissions.length >= IP_RATE_LIMIT) {
      console.log(`IP rate limit exceeded: ${clientIP}`);
      return res.status(429).json({ 
        error: 'Too many submissions. Please try again later.',
        retryAfter: 3600
      });
    }

    // Honeypot check - reject if honeypot field is filled
    if (website && website.trim() !== '') {
      console.log('Bot detected: honeypot field filled');
      return res.status(400).json({ error: 'Invalid submission' });
    }

    // Validation - certificates are optional
    if (!firstName || !lastName || !contactMethod || !contactInfo) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ 
        error: 'Required fields are missing',
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          contactMethod: !contactMethod,
          contactInfo: !contactInfo
        }
      });
    }

    // Validate contact method
    const validContactMethods = ['Email', 'Viber', 'WhatsApp', 'SMS/Text'];
    if (!validContactMethods.includes(contactMethod)) {
      console.log('Invalid contact method:', contactMethod);
      return res.status(400).json({ error: 'Invalid contact method' });
    }

    // Map contactInfo to email or phone based on contactMethod
    let email = null;
    let phone = null;

    if (contactMethod === 'Email') {
      if (!validateEmail(contactInfo)) {
        console.log('Invalid email format:', contactInfo);
        return res.status(400).json({ error: 'Invalid email format' });
      }
      email = contactInfo.toLowerCase().trim();
    } else if (['Viber', 'WhatsApp', 'SMS/Text'].includes(contactMethod)) {
      if (!validatePhone(contactInfo)) {
        console.log('Invalid phone format:', contactInfo);
        return res.status(400).json({ error: 'Invalid phone number format' });
      }
      phone = contactInfo.trim();
    }

    // Double submission protection (per email/phone)
    const submissionKey = email || phone;
    if (recentSubmissions.has(submissionKey)) {
      const lastSubmissionTime = recentSubmissions.get(submissionKey);
      const timeSinceLastSubmission = now - lastSubmissionTime;
      
      if (timeSinceLastSubmission < SUBMISSION_COOLDOWN) {
        const remainingSeconds = Math.ceil((SUBMISSION_COOLDOWN - timeSinceLastSubmission) / 1000);
        console.log(`Duplicate submission detected: ${submissionKey}`);
        return res.status(429).json({ 
          error: 'Please wait before submitting again',
          retryAfter: remainingSeconds
        });
      }
    }
    
    // Record this submission (both by key and IP)
    recentSubmissions.set(submissionKey, now);
    recentIPSubmissions.push(now);
    submissionsByIP.set(clientIP, recentIPSubmissions);

    // Ensure certificates is an array (can be empty)
    const qualificationsArray = Array.isArray(certificates) ? certificates : [];

    // Sanitize input to prevent XSS
    const sanitizedFirstName = validator.escape(firstName.trim());
    const sanitizedLastName = validator.escape(lastName.trim());

    // Create enrollment data for Firestore
    const enrollmentData = {
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      preferredContactMethod: contactMethod,
      qualifications: qualificationsArray,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      submittedFromIP: clientIP
    };

    // Add email or phone based on contact method
    if (email) {
      enrollmentData.email = email;
    }
    if (phone) {
      enrollmentData.phone = phone;
    }

    // Save enrollment to Firestore
    console.log('Saving enrollment:', { firstName: sanitizedFirstName, lastName: sanitizedLastName, contactMethod });
    const enrollmentRef = await db.collection('enrollments').add(enrollmentData);
    
    // Get the saved enrollment document
    const enrollmentDoc = await enrollmentRef.get();
    const savedEnrollment = {
      id: enrollmentDoc.id,
      ...enrollmentDoc.data()
    };

    console.log('Enrollment saved successfully:', enrollmentRef.id);

    res.status(201).json({ 
      success: true, 
      message: 'Enrollment submitted successfully',
      enrollment: savedEnrollment
    });
  } catch (error) {
    console.error('Error processing enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'Vanua Academy API',
    version: '1.0.0',
    status: 'running'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown for Cloud Run
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});