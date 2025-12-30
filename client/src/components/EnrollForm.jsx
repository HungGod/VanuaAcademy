import { useState, useEffect, useRef } from 'react';
import certificatesData from '../data/certificates';
import { contactMethods, emailMethods, phoneMethods } from '../data/formPreferredContact';
import paymentMethods from '../data/formPaymentMethods';

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactMethod: 'Email',
    contactInfo: '',
    certificates: [],
    paymentMethod: paymentMethods[0] || ''
  });
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const contactDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target)) {
        setIsContactDropdownOpen(false);
      }
    };

    if (isContactDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContactDropdownOpen]);

  // Extract certificate names from certificates data for the form dropdown
  const certificates = certificatesData.map(cert => cert.name);

  // Get the current contact method's icon
  const currentContactMethod = contactMethods.find(m => m.value === formData.contactMethod);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear contactInfo error when contactMethod changes
    if (name === 'contactMethod' && errors.contactInfo) {
      setErrors(prev => ({
        ...prev,
        contactInfo: ''
      }));
    }
  };

  const handleAddCertificate = (certificate) => {
    if (!certificate) return;
    
    // Check for duplicates
    if (formData.certificates.includes(certificate)) {
      return; // Don't add if already exists
    }
    
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, certificate]
    }));
    
    // Reset dropdown
    setSelectedCertificate('');
    
    // Clear error for certificates when user makes a selection
    if (errors.certificates) {
      setErrors(prev => ({
        ...prev,
        certificates: ''
      }));
    }
  };

  const handleRemoveCertificate = (certificateToRemove) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c !== certificateToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Please select a contact method';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    } else {
      if (emailMethods.includes(formData.contactMethod)) {
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo)) {
          newErrors.contactInfo = 'Invalid email format';
        }
      } else if (phoneMethods.includes(formData.contactMethod)) {
        // Phone number validation - allows international format with +, spaces, dashes, parentheses
        // Removes common formatting characters for validation
        const phoneDigits = formData.contactInfo.replace(/[\s\-\(\)\+]/g, '');
        if (!/^\d{7,15}$/.test(phoneDigits)) {
          newErrors.contactInfo = 'Invalid phone number format';
        }
      }
    }
    
    // Certificates are optional, no validation needed
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Enrollment submitted successfully!' });
        setFormData({
          firstName: '',
          lastName: '',
          contactMethod: 'Email',
          contactInfo: '',
          certificates: [],
          paymentMethod: paymentMethods[0] || ''
        });
        setSelectedCertificate('');
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to submit enrollment' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-16 bg-white dark:bg-gray-900">
      <style>{`
        .focus-ring-primary:focus {
          --tw-ring-color: #72955f !important;
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="h-32 md:h-32">
        </div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">Enroll Now</h2>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-primary">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-black dark:text-white mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus-ring-primary'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-black dark:text-white mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus-ring-primary'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="contactMethod" className="block text-sm font-medium text-black dark:text-white mb-2">
              Preferred Contact
            </label>
            <div className="flex gap-2 relative items-stretch">
              <div className="relative flex-shrink-0 w-16" ref={contactDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className={`w-full h-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border rounded-lg focus:outline-none focus:ring-2 flex items-center justify-center ${
                    errors.contactMethod 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus-ring-primary'
                  }`}
                  aria-label={`Selected contact method: ${formData.contactMethod}`}
                >
                  {currentContactMethod && (() => {
                    const IconComponent = currentContactMethod.icon;
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                </button>
                {isContactDropdownOpen && (
                  <div className="absolute z-10 left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg min-w-[140px]">
                    {contactMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, contactMethod: method.value }));
                            setIsContactDropdownOpen(false);
                            if (errors.contactMethod) {
                              setErrors(prev => ({ ...prev, contactMethod: '' }));
                            }
                          }}
                          className="w-full px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors whitespace-nowrap text-left"
                        >
                          <span className="text-black dark:text-white flex-shrink-0">
                            <IconComponent className="h-5 w-5" />
                          </span>
                          <span className="text-black dark:text-white">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <input
                type={formData.contactMethod === 'Email' ? 'email' : 'tel'}
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className={`flex-1 min-w-0 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.contactInfo 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus-ring-primary'
                }`}
                placeholder={
                  formData.contactMethod === 'Email' 
                    ? 'Enter your email' 
                    : formData.contactMethod 
                    ? `Enter your ${formData.contactMethod} number` 
                    : 'Select contact method first'
                }
                disabled={!formData.contactMethod}
              />
            </div>
            {errors.contactMethod && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactMethod}</p>
            )}
            {errors.contactInfo && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactInfo}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="certificateSelect" className="block text-sm font-medium text-black dark:text-white mb-2">
              Certificates of Enrollment <span className="text-gray-600 dark:text-gray-400 font-normal">(up to {certificates.length})</span>
            </label>
            <div className="mb-3">
              <select
                id="certificateSelect"
                value={selectedCertificate}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    handleAddCertificate(value);
                  }
                }}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border rounded-lg focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 focus-ring-primary"
              >
                <option value="">Select a certificate to add</option>
                {certificates
                  .filter(cert => !formData.certificates.includes(cert))
                  .map((cert, index) => (
                    <option key={index} value={cert}>{cert}</option>
                  ))}
              </select>
            </div>
            
            {/* List of added certificates */}
            {formData.certificates.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-black dark:text-white mb-2">Selected Certificates:</p>
                <ul className="space-y-2">
                  {formData.certificates.map((cert, index) => (
                    <li 
                      key={index}
                      className="flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-2 rounded-lg border-2 border-primary"
                    >
                      <span className="text-black dark:text-white">{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertificate(cert)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors ml-4"
                        aria-label={`Remove ${cert}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors.certificates && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.certificates}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-black dark:text-white mb-2">
              Preferred Method of Payment
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border rounded-lg focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 focus-ring-primary"
            >
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-secondary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <div className="h-64 md:h-64"></div>
    </section>
  );
};

export default EnrollForm;

