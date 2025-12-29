export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
export const validatePhone = (phone) => {
    const phoneDigits = phone.replace(/[\s\-\(\)\+]/g, '');
    return /^\d{7,15}$/.test(phoneDigits);
};