import about from '../data/about';
const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* About Us Heading */}
        <div className="h-32 md:h-32"></div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">About Us</h2>
      </div>
      
      {/* Fiji Woman Image Container - Full Width */}
      <div className="relative w-full bg-white">
        <div className="relative bg-white">
          <img 
            src={about.image} 
            alt={about.imageAlt} 
            className="w-full h-[600px] object-cover object-bottom"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Desktop Content Card - Floating Right (xl and above) */}
          <div className="absolute top-1/2 left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-lg hidden xl:block">
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-[#72955f]">
              {about.card.map((card, index) => (
                <p key={index} className="text-black leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
          
          {/* Tablet/Small Laptop Content Card - Centered (md to xl) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[40%] min-w-[300px] max-w-lg hidden md:block xl:hidden">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#72955f]">
              {about.card.map((card, index) => (
                <p key={index} className="text-black leading-relaxed mb-4">{card}</p>
              ))}
            </div>
          </div>
          
          {/* Mobile Content Card - Below Image */}
          <div className="md:hidden px-4 -mt-8 relative z-10">
            <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-[#72955f]">
              {about.card.map((card, index) => (
                <p key={index} className="text-black leading-relaxed mb-4">{card}</p>
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

