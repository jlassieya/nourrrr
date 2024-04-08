import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NightImg from "../assets/night.jpeg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

function About() {
  return (
    <>
  
      <Hero
        cName="hero-mid"
        heroImg={NightImg}
        title="À propos"
        btnClass="hide"
      />
      <AboutUs />
   
    </>
  );
}

export default About;
