import about from '../data/about';

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* About Us Heading */}
        <div className="h-32 md:h-32"></div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">About Us</h2>
      </div>
      
      {/* Fiji Woman Image Container - Full Width */}
      <div>
        <div className="relative bg-white dark:bg-gray-800">
        <picture>
          <source
            type="image/webp"
            srcSet={about.image.srcset}
            sizes={about.image.sizes}
          />
          <img 
            src={about.image.src} 
            alt={about.imageAlt} 
            className="w-full max-h-[768px] object-cover object-bottom"
            loading="lazy"
          />
        </picture>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>
          
          {/* Desktop Content Card - Floating Right (xl and above) */}
          <div className="absolute top-1/2 left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-lg hidden xl:block">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl border-2 border-primary">
              {about.card.map((card, index) => (
                <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
          
          {/* Mobile Content Card - Below Image */}
          <div className="md:hidden px-4 -mt-8 relative z-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-primary">
              {about.card.map((card, index) => (
                <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tablet/Small Laptop Content Card - Below Image (md to xl) */}
        <div className="hidden md:block xl:hidden -mt-8 relative z-10">
          <div className="w-[75%] min-w-[300px] max-w-lg mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl border-2 border-primary">
              {about.card.map((card, index) => (
                <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-32 md:h-32">
      </div>
    </section>
  );
};

export default AboutUs;

