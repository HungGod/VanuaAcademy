import certificates from '../data/certificates';

const Certificates = () => {

  return (
    <section id="certificates" className="py-16 bg-white dark:bg-gray-900">
      <div className="h-32 md:h-32"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">Certificates Offered</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8">
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
              <div className="p-2 sm:p-4 md:p-6 lg:p-5 xl:p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">{cert.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{cert.narrative}</p>
                
                <div className="mb-4 flex-grow">
                  <ul className="space-y-3 lg:space-y-4">
                    {cert.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex flex-col">
                        <span className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">
                          {bullet.time}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {bullet.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-2xl text-center font-bold mt-auto text-primary pt-4 border-t border-gray-200 dark:border-gray-700">{cert.price}</p>
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

