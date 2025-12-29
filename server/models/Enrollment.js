import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  preferredContactMethod: {
    type: String,
    required: true,
    trim: true,
    enum: ['Email', 'Viber', 'WhatsApp', 'SMS/Text']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  qualifications: {
    type: [String],
    default: []
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Enrollment', enrollmentSchema);




