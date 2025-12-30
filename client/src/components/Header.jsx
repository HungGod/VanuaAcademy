import { useState } from 'react';
import nav from '../data/nav';
import contactInfo from '../data/contactInfo';
import logo, { Logo } from '../data/logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <a href="/" className="text-black hover:text-[#72955f] transition-colors">
              <Logo className="h-12 w-12" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {nav.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-black hover:text-[#72955f] transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Social Media Links */}
          <div className="hidden md:flex items-center space-x-4">
            {contactInfo.socialMedia.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-[#72955f] transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="px-4 py-2 text-black border-2 border-[#000000] rounded-lg font-medium transition-colors hover:text-[#72955f] hover:border-[#72955f]"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            {nav.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-black hover:text-[#72955f] transition-colors py-2 font-medium"
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center space-x-4 pt-2">
              {contactInfo.socialMedia.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#72955f] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="px-4 py-2 text-black border-2 border-[#000000] rounded-lg font-medium transition-colors hover:text-[#72955f] hover:border-[#72955f]"
              >
                Contact Us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

