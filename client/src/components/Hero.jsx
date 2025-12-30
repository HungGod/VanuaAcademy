import hero from '../data/hero';
import { FullLogo } from '../data/icons';


const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
      <picture>
        <source
          type="image/webp"
          srcSet={hero.backgroundImage.srcset}
          sizes={hero.backgroundImage.sizes}
        />
        <img 
          src={hero.backgroundImage.src} 
          alt={hero.backgroundImageAlt} 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </picture>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <div className="flex items-center justify-center">
          <div 
            className="bg-white dark:bg-gray-800 p-3 md:p-6 flex items-center justify-center mx-auto w-48 h-48 md:w-64 md:h-64"
          >
            <FullLogo className="w-full h-full text-black dark:text-white" />
          </div>
        </div>
      </div>
      
      {/* Floating card at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-full max-w-lg px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 relative overflow-hidden border-2 border-primary">
          {/* Decorative opening quote */}
          <div className="absolute top-2 left-4 text-5xl md:text-6xl opacity-20 font-serif leading-none text-primary">
            "
          </div>
          <blockquote className="relative z-10 pl-8 md:pl-10">
            <p className="text-base md:text-lg italic text-black dark:text-white text-center mb-3">
            {hero.quote}
            </p>
            <footer className="text-sm md:text-base text-black dark:text-white text-center font-semibold">
              — {hero.quoteAuthor}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Hero;

