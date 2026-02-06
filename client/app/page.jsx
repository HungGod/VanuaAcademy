import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Certificates from '../components/Certificates';
import EnrollForm from '../components/EnrollForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Header/>
        <Hero />
        <AboutUs />
        <Certificates />
        <EnrollForm />
      </main>
      <Footer />
    </div>
  );
}


