import { useState, useEffect, useRef } from 'react';

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactMethod: 'Email',
    contactInfo: '',
    certificates: [],
    paymentMethod: ''
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

  const certificates = [
    'Certificate in Massage Therapy',
    'Certificate in Beauty & Spa Therapy',
    'Certificate in Nail Technology'
  ];

  const contactMethods = [
    { value: 'Viber', label: 'Viber', icon: 'V' },
    { value: 'WhatsApp', label: 'WhatsApp', icon: 'W' },
    { value: 'SMS/Text', label: 'SMS/Text', icon: 'S' },
    { value: 'Email', label: 'Email', icon: 'E' }
  ];

  const paymentMethods = [
    'FNPT',
    'Direct (Cash/Card)',
    'Other'
  ];

  // Helper function to render contact method icon
  const renderContactIcon = (method) => {
    switch(method) {
      case 'Viber':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4C12.4477 4 12 4.44772 12 5C12 5.55228 12.4477 6 13 6C14.2728 6 15.2557 6.41989 15.9179 7.08211C16.5801 7.74433 17 8.72725 17 10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10C19 8.27275 18.4199 6.75567 17.3321 5.66789C16.2443 4.58011 14.7272 4 13 4Z" fill="#7B519C"></path>
            <path d="M5.014 8.00613C5.12827 7.1024 6.30277 5.87414 7.23488 6.01043L7.23339 6.00894C8.01251 6.15699 8.65217 7.32965 9.07373 8.10246C9.14298 8.22942 9.20635 8.34559 9.26349 8.44465C9.55041 8.95402 9.3641 9.4701 9.09655 9.68787C9.06561 9.7128 9.03317 9.73855 8.9998 9.76504C8.64376 10.0477 8.18114 10.4149 8.28943 10.7834C8.5 11.5 11 14 12.2296 14.7107C12.6061 14.9283 12.8988 14.5057 13.1495 14.1438C13.2087 14.0583 13.2656 13.9762 13.3207 13.9067C13.5301 13.6271 14.0466 13.46 14.5548 13.736C15.3138 14.178 16.0288 14.6917 16.69 15.27C17.0202 15.546 17.0977 15.9539 16.8689 16.385C16.4659 17.1443 15.3003 18.1456 14.4542 17.9421C12.9764 17.5868 7 15.27 5.08033 8.55801C4.97981 8.26236 4.99645 8.13792 5.01088 8.02991L5.014 8.00613Z" fill="#7B519C"></path>
            <path d="M13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9C13.1748 9 13.4332 9.09745 13.6679 9.33211C13.9025 9.56676 14 9.82523 14 10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10C16 9.17477 15.5975 8.43324 15.0821 7.91789C14.5668 7.40255 13.8252 7 13 7Z" fill="#7B519C"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.51742 23.8312C7.54587 23.8469 7.57508 23.8612 7.60492 23.874C8.14762 24.1074 8.81755 23.5863 10.1574 22.5442L11.5 21.5C14.1884 21.589 16.514 21.2362 18.312 20.6071C20.3227 19.9035 21.9036 18.3226 22.6072 16.3119C23.5768 13.541 23.5768 8.45883 22.6072 5.68794C21.9036 3.67722 20.3227 2.0963 18.312 1.39271C15.1103 0.272407 8.82999 0.293306 5.68806 1.39271C3.67733 2.0963 2.09642 3.67722 1.39283 5.68794C0.423255 8.45883 0.423255 13.541 1.39283 16.3119C2.09642 18.3226 3.67733 19.9035 5.68806 20.6071C6.08252 20.7451 6.52371 20.8965 7 21C7 22.6974 7 23.5461 7.51742 23.8312ZM9 20.9107V19.7909C9 19.5557 8.836 19.3524 8.60597 19.3032C7.84407 19.1403 7.08676 18.9776 6.34862 18.7193C4.91238 18.2168 3.78316 17.0875 3.2806 15.6513C2.89871 14.5599 2.66565 12.8453 2.66565 10.9999C2.66565 9.15453 2.89871 7.43987 3.2806 6.3485C3.78316 4.91227 4.91238 3.78304 6.34862 3.28048C7.61625 2.83692 9.71713 2.56282 11.9798 2.56032C14.2422 2.55782 16.3561 2.82723 17.6514 3.28048C19.0876 3.78304 20.2169 4.91227 20.7194 6.3485C21.1013 7.43987 21.3344 9.15453 21.3344 10.9999C21.3344 12.8453 21.1013 14.5599 20.7194 15.6513C20.2169 17.0875 19.0876 18.2168 17.6514 18.7193C15.5197 19.4652 13.259 19.549 11.0239 19.4828C10.9071 19.4794 10.7926 19.5165 10.7004 19.5882L9 20.9107Z" fill="#7B519C"></path>
          </svg>
        );
      case 'WhatsApp':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        );
      case 'SMS/Text':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
          </svg>
        );
      case 'Email':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        );
      default:
        return null;
    }
  };

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
      if (formData.contactMethod === 'Email') {
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo)) {
          newErrors.contactInfo = 'Invalid email format';
        }
      } else if (['Viber', 'WhatsApp', 'SMS/Text'].includes(formData.contactMethod)) {
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
          paymentMethod: ''
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
    <section id="enroll" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="h-32 md:h-32">
        </div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Enroll Now</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#72955f]">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-500 text-white placeholder:text-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#72955f]'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-500 text-white placeholder:text-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#72955f]'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="contactMethod" className="block text-sm font-medium text-black mb-2">
              Preferred Contact
            </label>
            <div className="flex gap-2 relative items-stretch">
              <div className="relative flex-shrink-0 w-16" ref={contactDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className={`w-full h-full px-4 py-2 bg-gray-500 text-white border rounded-lg focus:outline-none focus:ring-2 flex items-center justify-center ${
                    errors.contactMethod 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-[#72955f]'
                  }`}
                  aria-label={`Selected contact method: ${formData.contactMethod}`}
                >
                  {renderContactIcon(formData.contactMethod)}
                </button>
                {isContactDropdownOpen && (
                  <div className="absolute z-10 w-auto min-w-full mt-1 bg-gray-500 border border-gray-300 rounded-lg shadow-lg">
                    {contactMethods.map((method) => (
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
                        className="w-full px-4 py-2 text-white hover:bg-gray-600 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors whitespace-nowrap"
                      >
                        {renderContactIcon(method.value)}
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type={formData.contactMethod === 'Email' ? 'email' : 'tel'}
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className={`flex-1 px-4 py-2 bg-gray-500 text-white placeholder:text-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.contactInfo 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#72955f]'
                }`}
                placeholder={
                  formData.contactMethod === 'Email' 
                    ? 'Enter your email (example@emailprovider.com)' 
                    : formData.contactMethod 
                    ? `Enter your ${formData.contactMethod} number (+679)000-0000` 
                    : 'Select contact method first'
                }
                disabled={!formData.contactMethod}
              />
            </div>
            {errors.contactMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.contactMethod}</p>
            )}
            {errors.contactInfo && (
              <p className="mt-1 text-sm text-red-600">{errors.contactInfo}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="certificateSelect" className="block text-sm font-medium text-black mb-2">
              Certificates of Enrollment <span className="text-gray-600 font-normal">(up to {certificates.length})</span>
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
                className="w-full px-4 py-2 bg-gray-500 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72955f]"
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
                <p className="text-sm font-medium text-black mb-2">Selected Certificates:</p>
                <ul className="space-y-2">
                  {formData.certificates.map((cert, index) => (
                    <li 
                      key={index}
                      className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border-2 border-[#72955f]"
                    >
                      <span className="text-black">{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertificate(cert)}
                        className="text-red-600 hover:text-red-800 transition-colors ml-4"
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
              <p className="mt-1 text-sm text-red-600">{errors.certificates}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-black mb-2">
              Preferred Method of Payment
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-500 text-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.paymentMethod 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-[#72955f]'
              }`}
            >
              <option value="">Select payment method</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>{method}</option>
              ))}
            </select>
            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
            )}
          </div>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#72955f' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#5a7a4a')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#72955f')}
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

