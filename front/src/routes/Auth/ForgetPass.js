import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      // Make a request to the forget password endpoint
      const response = await axios.put(
        `http://localhost:8080/api/reinitialiserLeMotDePasse/MotDePasseOublie?email=${email}`
      );
      setMessage(response.data);
      setError("");
      console.log(response.data);
      setLoading(false);
      window.location.href = `/auth/set-password/${email}`;
    } catch (error) {
      setMessage("");
      setError("Impossible de réinitialiser le mot de passe. Veuillez réessayer.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <h1 className="text-3xl font-semibold mb-4 text-blue-500">Mot de passe oublié</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
          
            type="email"
            placeholder="Entrez votre adresse e-mail"
            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {loading ? (
          <Spinner className="my-4" color="blue" size="sm" />
        ) : (
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-4"
          >
            Réinitialiser 
          </button>
        )}

        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link to="/" className="text-blue-500 hover:underline">
          Revenir à la connexion  
        </Link>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="flex items-center justify-center">
          
        </div>
      </div>
    </div>
  );
};
