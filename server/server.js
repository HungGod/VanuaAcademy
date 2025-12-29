import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.error('Please set FIREBASE_SERVICE_ACCOUNT (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (file path) in mongo.env');
  process.exit(1);
}

// Get Firestore instance
const db = admin.firestore();

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
      if (!validateEmail(contactInfo)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      email = contactInfo.toLowerCase().trim();
    } else if (['Viber', 'WhatsApp', 'SMS/Text'].includes(contactMethod)) {
      if (!validatePhone(contactInfo)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
      }
      phone = contactInfo.trim();
    }

    // Ensure certificates is an array (can be empty)
    // Map certificates from frontend to qualifications in database
    const qualificationsArray = Array.isArray(certificates) ? certificates : [];

    // Create enrollment data for Firestore
    const enrollmentData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      preferredContactMethod: contactMethod,
      qualifications: qualificationsArray,
      paymentMethod: paymentMethod.trim(),
      submittedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Add email or phone based on contact method
    if (email) {
      enrollmentData.email = email;
    }
    if (phone) {
      enrollmentData.phone = phone;
    }

    // Save enrollment to Firestore
    const enrollmentRef = await db.collection('enrollments').add(enrollmentData);
    
    // Get the saved enrollment document
    const enrollmentDoc = await enrollmentRef.get();
    const savedEnrollment = {
      id: enrollmentDoc.id,
      ...enrollmentDoc.data()
    };

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
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({ 
    service: 'Vanua Academy API',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

