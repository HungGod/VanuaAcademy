const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* About Us Heading */}
        <div className="h-32 md:h-32"></div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">About Us</h2>
      </div>
      
      {/* Fiji Woman Image Container - Full Width */}
      <div className="relative w-full">
        <div className="relative">
          <img 
            src="/images/high-quality-fiji-woman-spread.jpg" 
            alt="Fiji woman" 
            className="w-full h-auto object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Floating Content Card - Center Right */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10 max-w-lg">
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-[#72955f]">
              <p className="text-black leading-relaxed mb-4">
              Vanua Academy, located in Savusavu, Fiji’s “hidden paradise”, offers an exciting pathway into the growing wellness and tourism industry. Students gain hands-on spa training, business skills, and internationally recognised CIDESCO certification, the global gold standard in aesthetics and beauty therapy since 1957, leading to resort careers or successful self-employment.
              </p>
              <p className="text-black leading-relaxed mb-4">
              The programme is designed to meet real industry demand in Fiji’s Northern Division while opening education and income opportunities for rural communities. Enrol at Vanua Academy to gain professional qualifications, and build a future in a world-class wellness industry.
              </p>
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

