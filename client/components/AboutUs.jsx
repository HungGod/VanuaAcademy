import about from '../data/about';

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* About Us Heading */}
        <div className="h-64 md:h-64"></div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">About Us</h2>
      </div>
      
      {/* XL Desktop: Image on left, card on right, card overlapping image by ~33% */}
      <div className="container mx-auto px-4 hidden xl:block">
        <div className="relative">
          {/* Image on the left with border */}
          <div className="relative">
            <picture>
              <source
                type="image/webp"
                srcSet={about.image.srcset}
                sizes={about.image.sizes}
              />
              <img 
                src={about.image.src} 
                alt={about.imageAlt} 
                className="w-full h-auto object-cover border-2 border-primary rounded-lg"
                loading="lazy"
              />
            </picture>
            {/* Darkening overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
          </div>
          
          {/* Card on the right, overlapping the image by ~33% (left edge at 60% to avoid margins) */}
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 pr-8" style={{ left: '60%', width: '45%', maxWidth: '600px' }}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl border-2 border-primary">
              {about.card.map((card, index) => (
                <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet/Small Laptop: Image above, card below with ~5% overlap */}
      <div className="hidden md:block xl:hidden">
        {/* Image - full width within container margins */}
        <div className="container mx-auto px-4 relative z-0">
          <div className="relative">
            <picture>
              <source
                type="image/webp"
                srcSet={about.image.srcset}
                sizes={about.image.sizes}
              />
              <img 
                src={about.image.src} 
                alt={about.imageAlt} 
                className="w-full h-auto object-cover border-2 border-primary rounded-lg"
                loading="lazy"
              />
            </picture>
            {/* Darkening overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
          </div>
        </div>
        
        {/* Card below image, overlapping by ~5% */}
        <div className="container mx-auto px-4 relative z-10 -mt-12">
          <div className="w-[75%] mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl border-2 border-primary">
              {about.card.map((card, index) => (
                <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Image above, card below with 5px margins */}
      <div className="md:hidden container mx-auto px-4">
        {/* Image */}
        <div className="relative mb-4">
          <picture>
            <source
              type="image/webp"
              srcSet={about.image.srcset}
              sizes={about.image.sizes}
            />
            <img 
              src={about.image.src} 
              alt={about.imageAlt} 
              className="w-full h-auto object-cover border-2 border-primary rounded-lg"
              loading="lazy"
            />
          </picture>
          {/* Darkening overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        </div>
        
        {/* Card with 5px margins */}
        <div className="mx-[5px]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-primary">
            {about.card.map((card, index) => (
              <p key={index} className="text-black dark:text-white leading-relaxed mb-4">{card}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="h-32 md:h-32">
      </div>
    </section>
  );
};

export default AboutUs;

