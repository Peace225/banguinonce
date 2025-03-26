import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ Optimisation SEO
import { FcGoogle } from "react-icons/fc"; // ✅ Icône Google
import { motion } from "framer-motion"; // ✅ Animation du texte

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      navigate("/");
    } catch (error) {
      alert("Erreur de connexion : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Connexion Google réussie !");
      navigate("/");
    } catch (error) {
      alert("Erreur Google Auth : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Optimisation SEO */}
      <Helmet>
        <title>Connexion - BanguiNonce</title>
        <meta name="description" content="Connectez-vous à BanguiNonce et trouvez des opportunités professionnelles en un seul clic." />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        
        {/* ✅ Animation du nom de la plateforme */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-blue-600 mb-2"
        >
          BanguiNonce
        </motion.h1>

        {/* ✅ Paragraphe SEO optimisé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-600 text-center max-w-lg mb-6"
        >
          La plateforme N°1 en Afrique Centrale pour les annonces d’emploi, 
          l’immobilier et les opportunités professionnelles. Rejoignez-nous dès aujourd’hui !
        </motion.p>

        {/* ✅ Logo animé */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-6"
        >
          <img src="/images/logo.jpg" alt="BanguiNonce Logo" className="h-20 w-auto" />
        </motion.div>

        {/* ✅ Formulaire de connexion */}
        <form onSubmit={handleLogin} className="bg-white p-6 shadow-lg rounded-md max-w-md w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se Connecter"}
          </button>
        </form>

        {/* ✅ Connexion avec Google */}
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md w-full max-w-md hover:bg-red-600 transition shadow-md"
            disabled={loading}
          >
            <FcGoogle className="h-6 w-6 mr-2" />
            {loading ? "Connexion..." : "Connexion avec Google"}
          </button>
        </div>

        {/* ✅ Lien vers l'inscription */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Vous n'avez pas encore de compte ?</p>
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
