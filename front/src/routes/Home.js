import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/12.jpg";
import Destination from "../components/Destination";
import Trip from "../components/Trip";
import Footer from "../components/Footer";

function Home() {
  return (
    <> 
      <Hero
        cName="hero"
        heroImg={HomeImg}
        title="Trouvez un expéditeur ou un
        voyageur au meilleur prix"
        text="Envoyez (presque) tout, partout en Tunisie grâce à des trajets déjà prévus.  Bienvenue sur Cocolis !"
        buttonText="Expédier ou recevoir un colis"
        url="/service"
        btnClass="show"
      />
      <Destination />
      <Trip />
     
    </>
  );
}

export default Home;
