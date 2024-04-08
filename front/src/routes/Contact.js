import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NightImg from "../assets/2.jpeg";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <>
     
      <Hero
        cName="hero-mid"
        heroImg={NightImg}
        title="Contact"
        btnClass="hide"
      />
      <ContactForm />
    
    </>
  );
}

export default Contact;
