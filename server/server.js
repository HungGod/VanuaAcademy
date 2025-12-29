import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Enrollment from './models/Enrollment.js';

// Load environment variables
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '..', 'mongo.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
let MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in mongo.env file');
  process.exit(1);
}

// Handle special characters in password (encode @ if not already encoded)
// The password might contain @ which needs to be %40 in the URI
// Format: mongodb+srv://username:password@host
// Find the last @ which separates credentials from host
const lastAtIndex = MONGO_URI.lastIndexOf('@');
if (lastAtIndex > 0) {
  const beforeAt = MONGO_URI.substring(0, lastAtIndex);
  const afterAt = MONGO_URI.substring(lastAtIndex + 1);
  
  // Check if there's a colon (indicating username:password format)
  const colonIndex = beforeAt.indexOf(':');
  if (colonIndex > 0) {
    const protocol = beforeAt.substring(0, beforeAt.indexOf('://') + 3);
    const credentials = beforeAt.substring(beforeAt.indexOf('://') + 3);
    const [username, ...passwordParts] = credentials.split(':');
    const password = passwordParts.join(':');
    
    // Encode @ in password if present
    const encodedPassword = password.replace(/@/g, '%40');
    MONGO_URI = `${protocol}${username}:${encodedPassword}@${afterAt}`;
  }
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Please check your MONGO_URI in mongo.env file');
    process.exit(1);
  });

// Enrollment API endpoint
app.post('/api/enroll', async (req, res) => {
  try {
    const { firstName, lastName, contactMethod, contactInfo, certificates, paymentMethod } = req.body;

    // Validation - certificates are optional
    if (!firstName || !lastName || !contactMethod || !contactInfo || !paymentMethod) {
      return res.status(400).json({ 
        error: 'Required fields are missing',
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          contactMethod: !contactMethod,
          contactInfo: !contactInfo,
          paymentMethod: !paymentMethod
        }
      });
    }

    // Validate contact method
    const validContactMethods = ['Email', 'Viber', 'WhatsApp', 'SMS/Text'];
    if (!validContactMethods.includes(contactMethod)) {
      return res.status(400).json({ error: 'Invalid contact method' });
    }

    // Map contactInfo to email or phone based on contactMethod
    let email = null;
    let phone = null;

    if (contactMethod === 'Email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      email = contactInfo.toLowerCase().trim();
    } else if (['Viber', 'WhatsApp', 'SMS/Text'].includes(contactMethod)) {
      // Phone number validation - allows international format with +, spaces, dashes, parentheses
      // Removes common formatting characters for validation
      const phoneDigits = contactInfo.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d{7,15}$/.test(phoneDigits)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
      }
      phone = contactInfo.trim();
    }

    // Ensure certificates is an array (can be empty)
    // Map certificates from frontend to qualifications in database
    const qualificationsArray = Array.isArray(certificates) ? certificates : [];

    // Create enrollment in MongoDB
    const enrollmentData = {
      firstName,
      lastName,
      preferredContactMethod: contactMethod,
      qualifications: qualificationsArray,
      paymentMethod
    };

    // Add email or phone based on contact method
    if (email) {
      enrollmentData.email = email;
    }
    if (phone) {
      enrollmentData.phone = phone;
    }

    const enrollment = new Enrollment(enrollmentData);

    const savedEnrollment = await enrollment.save();

    res.status(201).json({ 
      success: true, 
      message: 'Enrollment submitted successfully',
      enrollment: {
        id: savedEnrollment._id,
        firstName: savedEnrollment.firstName,
        lastName: savedEnrollment.lastName,
        preferredContactMethod: savedEnrollment.preferredContactMethod,
        email: savedEnrollment.email,
        phone: savedEnrollment.phone,
        qualifications: savedEnrollment.qualifications,
        paymentMethod: savedEnrollment.paymentMethod,
        submittedAt: savedEnrollment.submittedAt
      }
    });
  } catch (error) {
    console.error('Error processing enrollment:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

