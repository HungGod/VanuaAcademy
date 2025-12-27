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
                Our Academy excels in every aspect of the spa industry, including training, spa operations, product manufacturing, and tourism consultancy. We are CIDESCO Internationally accredited, offering successful graduates opportunity to work abroad. Since our inception, we have maintained a 100% employment rate for our graduates.
              </p>
              <p className="text-black leading-relaxed mb-4">
                As the backbone of Fiji's Spa Tourism Industry, Vanua Academy has been instrumental in providing essential expertise to resorts and hotels. With over 365 hotels and resorts in Fiji offering massage or spa services, our graduates are in high demand. Many of the most luxurious resorts and spas in Fiji are staffed entirely by our highly skilled alumni.
              </p>
              <p className="text-black leading-relaxed">
                Located in the beautiful and growing Savusavu, we proudly partner with Fiji's premium hotels and resorts, supporting with staffing solutions, Nama Fiji Thalassotherapy protocols & products. Vanua Academy has an international presence in the global Spa and Wellness sector.
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

