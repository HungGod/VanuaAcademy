const PartneredWith = () => {
  const partners = [
    { name: 'CIDESCO', image: '/images/cidesco-cert.png' },
    { name: 'Fiji Government', image: '/images/fiji-government.jpg' },
    { name: 'Australian Department of Education', image: '/images/aus-dept-education.jpg' },
    { name: 'FNPF', image: '/images/fnpf.jpg' },
    { name: 'New Zealand Education Ministry', image: '/images/nz-educationministry.jpg' },
    { name: 'TSLS', image: '/images/TSLS.webp' }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">

        <div className="h-64 md:h-64">

        </div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Certified and Accepted By</h2>

        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full h-32 border-2 border-[#72955f]"
            >
              <img 
                src={partner.image} 
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="h-32 md:h-32">
        </div>
      </div>
    </section>
  );
};

export default PartneredWith;

