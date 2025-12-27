import { useState } from 'react';

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    qualifications: [],
    paymentMethod: ''
  });
  const [selectedQualification, setSelectedQualification] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const qualifications = [
    'Certificate in Massage Therapy',
    'Certificate in Beauty & Spa Therapy',
    'Certificate in Nail Technology'
  ];

  const paymentMethods = [
    'TSLS',
    'FNPF',
    'Direct (cash or card)',
    'Other'
  ];

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
  };

  const handleAddQualification = () => {
    if (!selectedQualification) return;
    
    // Check for duplicates
    if (formData.qualifications.includes(selectedQualification)) {
      return; // Don't add if already exists
    }
    
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, selectedQualification]
    }));
    
    // Reset dropdown
    setSelectedQualification('');
    
    // Clear error for qualifications when user makes a selection
    if (errors.qualifications) {
      setErrors(prev => ({
        ...prev,
        qualifications: ''
      }));
    }
  };

  const handleRemoveQualification = (qualificationToRemove) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q !== qualificationToRemove)
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Qualifications are optional, no validation needed
    
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
          email: '',
          qualifications: [],
          paymentMethod: ''
        });
        setSelectedQualification('');
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
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-500 text-white placeholder:text-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-[#72955f]'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="qualificationSelect" className="block text-sm font-medium text-black mb-2">
              Qualifications of Enrollment <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <div className="flex gap-2 mb-3">
              <select
                id="qualificationSelect"
                value={selectedQualification}
                onChange={(e) => setSelectedQualification(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72955f]"
              >
                <option value="">Select a qualification to add</option>
                {qualifications
                  .filter(qual => !formData.qualifications.includes(qual))
                  .map((qual, index) => (
                    <option key={index} value={qual}>{qual}</option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddQualification}
                disabled={!selectedQualification}
                className="px-4 py-2 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#72955f' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#5a7a4a')}
                onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#72955f')}
              >
                Add
              </button>
            </div>
            
            {/* List of added qualifications */}
            {formData.qualifications.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-black mb-2">Selected Qualifications:</p>
                <ul className="space-y-2">
                  {formData.qualifications.map((qual, index) => (
                    <li 
                      key={index}
                      className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border-2 border-[#72955f]"
                    >
                      <span className="text-black">{qual}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQualification(qual)}
                        className="text-red-600 hover:text-red-800 transition-colors ml-4"
                        aria-label={`Remove ${qual}`}
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
            {errors.qualifications && (
              <p className="mt-1 text-sm text-red-600">{errors.qualifications}</p>
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

