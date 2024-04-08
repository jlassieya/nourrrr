import "./styles.css";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Login from "./routes/Auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./routes/Auth/Register";
import SetPassword from "./routes/Auth/SetPassword";
import ForgetPass from "./routes/Auth/ForgetPass";
export default function App() {
  return (
    <div className="App"> <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forget-password" element={<ForgetPass />} />
      <Route path="/auth/set-password/:id" element={<SetPassword />} />

      </Routes>
      <Footer />
    </div>
  );
}
