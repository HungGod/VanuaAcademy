const Footer = () => {
  return (
    <footer className="text-white py-12" style={{ backgroundColor: '#72955f' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img 
              src="/images/Vanua.jpg" 
              alt="Vanua Academy Logo" 
              className="h-48 w-48 object-contain"
            />
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <p className="text-white opacity-90 mb-2">
              <a href="mailto:info@vanuaacademy.com" className="hover:text-white transition-colors">
                info@vanuaacademy.com
              </a>
            </p>
            <p className="text-white opacity-90 mb-2">
              <a href="tel:+6790000000" className="hover:text-white transition-colors">
                (+679) 000-0000
              </a>
            </p>
            <p className="text-white opacity-90 mb-2">14 Rava rd, Savusavu, Fiji</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center">
          <p className="text-white opacity-75">COPYRIGHT 2025 Vanua Academy Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

