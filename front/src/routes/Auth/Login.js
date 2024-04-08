import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import login from '../../assets/login.json';


export default function Login() {
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
      if (attempts >= 3) {
          setLoginDisabled(true);
          setCooldown(30); // Reset cooldown to 30 seconds
          const timer = setInterval(() => {
              setCooldown(prevCooldown => prevCooldown - 1); // Decrease cooldown every second
          }, 1000);
          return () => clearInterval(timer);
      }
  }, [attempts]);

  useEffect(() => {
      if (cooldown === 0 && attempts >= 3) {
          setAttempts(0);
          setLoginDisabled(false);
      }
  }, [cooldown]);

  const handleLogin = async () => {
      // Validation des entrées
      if (!nomUtilisateur || !motDePasse) {
          console.log('Merci de remplir tous les champs.');
          alert('Merci de remplir tous les champs.');
          return;
      }

      try {
        // Faire une requête API en utilisant Axios
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            nomUtilisateur: nomUtilisateur,
            motDePasse: motDePasse,
        });
        console.log("in try", response); // Move this line here
    
        // Extraire le jeton et le rôle de la réponse
        const { token, message, role } = response.data;
    
        // Enregistrer le jeton dans localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userType', role);
    
        alert(message);
        setNomUtilisateur('');
        setMotDePasse('');
        setAttempts(0);
    
        // Rediriger en fonction du rôle de l'utilisateur
        switch (role) {
            case 'ADMIN':
                window.location.href = '/admin/dashboard';
                break;
            case 'USER':
                window.location.href = '/expéditeur/dashboard';
                break;
            case 'VOYAGEUR':
                window.location.href = '/voyageur/dashboard';
                break;
            default:
                // Rediriger vers une page par défaut si le rôle n'est pas reconnu
                /*    window.location.href = '/default'; */
        }
    } catch (error) {
        console.error('La connexion a échoué :', error.response.data);
        // console.log("in catch", response); // Remove this line
    
        if (error.response.status === 401) {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
            setAttempts(prevAttempts => prevAttempts + 1);
        } else {
            alert('Une erreur s\'est produite lors de la connexion');
        }
        // Gérer l'erreur : afficher un message d'erreur ou rediriger
    }
    
  };

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="flex justify-center items-center h-full">
                    <Lottie animationData={login} />
                </div>
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-4 text-blue-500">Connexion</h1>
                    <input
                        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={nomUtilisateur}
                        onChange={(e) => setNomUtilisateur(e.target.value)}
                        disabled={loginDisabled}
                    />
                    <div className="relative w-full mb-4">
                        <input
                            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            disabled={loginDisabled}
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                                    ></path>
                                </svg>
                            )}
                        </span>
                    </div>
                    {attempts >= 1 && (
                        <p className="mb-2">Tentatives restantes : {3 - attempts}</p>
                    )}
                    {cooldown > 0 && (
                        <p>Prochain essai dans {cooldown} secondes</p>
                    )}
                    <p className="mb-2">
                        <Link to="/auth/forget-password" className="text-blue-500 cursor-pointer">
                            Mot de passe oublié?
                        </Link>
                    </p>
                    <p className="mb-4">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/auth/register" className="text-blue-500">
                            Inscrivez-vous ici
                        </Link>
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={handleLogin}
                        disabled={loginDisabled}
                    >
                        Connexion
                    </button>
                </div>
            </div>
        </div>
    )
}
