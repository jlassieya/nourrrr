import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NightImg from "../assets/10.jpg";
import Footer from "../components/Footer";
import Trip from "../components/Trip";

function Service() {
  return (
    <>
     
      <Hero
        cName="hero-mid"
        heroImg={NightImg}
        title="Service"
        btnClass="hide"
      />
      <Trip />
     
    </>
  );
}

export default Service;
