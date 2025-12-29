const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/fiji-high-quality-spread.jpg" 
          alt="Beautiful Fiji landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <img src="/images/Vanua.jpg" alt="Vanua Academy Logo" className="w-1/2 mx-auto border-2 border-[#72955f]" />
      </div>
      
      {/* Floating card at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-full max-w-lg px-4">
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 relative overflow-hidden border-2 border-[#72955f]">
          {/* Decorative opening quote */}
          <div className="absolute top-2 left-4 text-5xl md:text-6xl opacity-20 font-serif leading-none" style={{ color: '#72955f' }}>
            "
          </div>
          <blockquote className="relative z-10 pl-8 md:pl-10">
            <p className="text-base md:text-lg italic text-black text-center mb-3">
            Vanua Academy is your pathway to building a successful future in the tourism sector  
            </p>
            <footer className="text-sm md:text-base text-black text-center font-semibold">
              — Catharine Wadsworth, Founder
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Hero;

