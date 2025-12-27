import Header from '../components/Header';
import Hero from '../components/Hero';
import PartneredWith from '../components/PartneredWith';
import AboutUs from '../components/AboutUs';
import Qualifications from '../components/Qualifications';
import EnrollForm from '../components/EnrollForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Header/>
        <Hero />
        <PartneredWith />
        <AboutUs />
        <Qualifications />
        <EnrollForm />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

