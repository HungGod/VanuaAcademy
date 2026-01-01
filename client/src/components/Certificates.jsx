import certificates from '../data/certificates';

const Certificates = () => {

  return (
    <section id="certificates" className="py-16 bg-white dark:bg-gray-900">
      <div className="h-32 md:h-32"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">Certificates Offered</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 shadow-xl overflow-hidden border-2 border-primary flex flex-col"
            >
              <div className="h-48 bg-white dark:bg-gray-800 flex items-center justify-center border-b-2 border-primary flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    width="128"
                    height="128"
                  />
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black dark:text-white min-h-[2.5rem] sm:min-h-[3rem]">{cert.name}</h3>
                <div className="mb-3 sm:mb-4 min-h-[4rem] sm:min-h-[4.5rem]">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{cert.narrative}</p>
                </div>
                
                <div className="mb-3 sm:mb-4 flex-grow">
                  <ul className="space-y-2 sm:space-y-3">
                    {cert.bullets.map((bullet, bulletIndex) => {
                      // Fixed heights for each bullet index to ensure horizontal alignment
                      // Increased heights to accommodate full content without overflow
                      // Responsive heights for mobile
                      const bulletHeights = ['h-[7rem] sm:h-[8rem]', 'h-[7.5rem] sm:h-[8.5rem]', 'h-[6rem] sm:h-[7rem]'];
                      return (
                        <li key={bulletIndex} className={`flex flex-col ${bulletHeights[bulletIndex] || 'h-[7rem] sm:h-[8rem]'}`}>
                          <div className="h-[1.25rem] mb-1">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                              {bullet.time}
                            </span>
                          </div>
                          <div className="flex-grow pb-1 sm:pb-2">
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {bullet.description}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <p className="text-xl sm:text-2xl text-center font-bold mt-auto text-primary pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">{cert.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-32 md:h-32"></div>
    </section>
  );
};

export default Certificates;

