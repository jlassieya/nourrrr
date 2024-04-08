 import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";

export default function SetPassword() {
    const { id } = useParams(); 
    const [verificationCode, setVerificationCode] = useState('');
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSetPassword = async () => {
        try {
          // Make a request to the set password endpoint
            setLoading(true);
          console.log({
            id,
            verificationCode,
            nouveauMotDePasse,
          })
          const response = await axios.put('http://localhost:8080/api/reinitialiserLeMotDePasse/definirMotDePasse', {
            "email":id,
            verificationCode,
            nouveauMotDePasse,
          });
          setMessage(response.data);
            setError('');
            setLoading(false);
          alert("Mot de passe mis à jour avec succès");
          navigate('/');
          setError('');
        } catch (error) {
          setMessage('');
          console.log(error);
          console.log(error.response);
          console.log("eureur catch");
          setError('Impossible de définir le mot de passe. Veuillez vérifier vos entrées et réessayer.');
        }
      };
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-blue-500"> Nouveau mot de passe</h1> 
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Code de Verification :</label>
        <input
          type="text"
          placeholder="Entrez le code de vérification"
          className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nouveau mot de passe:</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Entrez un nouveau mot de passe"
            className="p-2 border border-gray-300 rounded w-full"
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
          />
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      {loading ? (          <Spinner className="my-4" color="blue" size="sm" />
      ) : (
        <button
          onClick={handleSetPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-4"
        >
          Confirmer
        </button>
      )}
 
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
    </div>
  )
}
