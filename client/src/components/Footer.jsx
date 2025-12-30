import contactInfo from '../data/contactInfo';
import { FullLogo } from '../data/icons';

const Footer = () => {
  return (
    <footer className="text-white py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div 
              className="bg-white dark:bg-gray-800 p-6 flex items-center justify-center"
              style={{ width: '256px', height: '256px' }}
            >
              <FullLogo className="w-full h-full text-black dark:text-white" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <p className="text-white opacity-90 mb-2">
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                {contactInfo.email}
              </a>
            </p>
            <p className="text-white opacity-90 mb-2">
              <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                {contactInfo.phone}
              </a>
            </p>
            <p className="text-white opacity-90 mb-4">{contactInfo.address}</p>
            
            {/* Social Media Icons */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              {contactInfo.socialMedia.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-8 w-8" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center">
          <p className="text-white opacity-75">COPYRIGHT {new Date().getFullYear()} {contactInfo.businessName}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

