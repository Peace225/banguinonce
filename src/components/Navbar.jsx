import { Link } from "react-router-dom";
import { useState } from "react";
import { Briefcase, User, UserCircle, LogIn, LogOut } from "lucide-react"; // ✅ Import des icônes Connexion & Déconnexion
import { useAuth } from "../context/AuthContext"; // ✅ Import du contexte d'authentification
import { auth } from "../utils/firebaseConfig"; // ✅ Import de Firebase Auth

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth(); // ✅ Vérifier si l'utilisateur est connecté

  return (
    <>
      {/* HEADER SUPÉRIEUR */}
      <div className="bg-gray-900 text-white p-2">
        <div className="container mx-auto flex justify-center items-center">
          {/* Boutons Recruteur & Candidat Centrés */}
          <div className="flex space-x-6">
            <Link to="/recruteur" className="flex items-center bg-blue-600 px-4 py-2 rounded-md text-white text-sm">
              <Briefcase className="h-4 w-4 mr-2" /> Recruteur
            </Link>
            <Link to="/candidat" className="flex items-center bg-green-600 px-4 py-2 rounded-md text-white text-sm">
              <User className="h-4 w-4 mr-2" /> Candidat
            </Link>
          </div>
        </div>
      </div>

      {/* NAVBAR PRINCIPALE */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* LOGO */}
          <img src="/images/logo.jpg" alt="BanguiNonce Logo" className="h-20 w-auto" />
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            BanguiNonce
          </Link>

          {/* MENU PRINCIPAL */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
            <Link to="/immobilier" className="text-gray-700 hover:text-blue-600">Immobilier</Link>
            <Link to="/emploi" className="text-gray-700 hover:text-blue-600">Emploi</Link>
            <Link to="/appelsoffres" className="text-gray-700 hover:text-blue-600">Appels d'Offres</Link>
            <Link to="/nosservices" className="text-gray-700 hover:text-blue-600">Nos Services</Link>
            <Link to="/automobile" className="text-gray-700 hover:text-blue-600">Automobile</Link>
          </div>

          {/* BOUTONS ACTIONS */}
          <div className="hidden md:flex space-x-4 items-center">

            {/* Bouton Profil + Connexion/Déconnexion */}
            <div className="flex items-center space-x-4">
              <Link to="/profil" className="flex items-center text-gray-700 hover:text-blue-600">
                <UserCircle className="h-6 w-6 mr-2" /> Mon Profil
              </Link>

              {/* ✅ Afficher Déconnexion si l'utilisateur est connecté */}
              {user ? (
                <button onClick={() => auth.signOut()} className="flex items-center text-red-600 hover:text-red-800">
                  <LogOut className="h-6 w-6 mr-2" /> Déconnexion
                </button>
              ) : (
                <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600">
                  <LogIn className="h-6 w-6 mr-2" /> Connexion
                </Link>
              )}
            </div>
          </div>

          {/* MENU MOBILE */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 text-2xl">
            ☰
          </button>
        </div>

        {/* MENU MOBILE OUVERT */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 p-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Accueil</Link>
            <Link to="/immobilier" className="block py-2 text-gray-700 hover:text-blue-600">Immobilier</Link>
            <Link to="/emploi" className="block py-2 text-gray-700 hover:text-blue-600">Emploi</Link>
            <Link to="/appels-offres" className="block py-2 text-gray-700 hover:text-blue-600">Appels d'Offres</Link>
            <Link to="/services" className="block py-2 text-gray-700 hover:text-blue-600">Nos Services</Link>
            <Link to="/annonces" className="block py-2 text-gray-700 hover:text-blue-600">Petites Annonces</Link>
            <Link to="/publier" className="block bg-blue-600 text-white px-4 py-2 mt-2 rounded-md text-center">
              Publier une Annonce
            </Link>
            <Link to="/profil" className="flex items-center block py-2 text-gray-700 hover:text-blue-600">
              <UserCircle className="h-5 w-5 mr-2" /> Mon Profil
            </Link>

            {/* ✅ Ajout de Connexion/Déconnexion dans le menu mobile */}
            {user ? (
              <button onClick={() => auth.signOut()} className="flex items-center text-red-600 hover:text-red-800 w-full mt-4">
                <LogOut className="h-6 w-6 mr-2" /> Déconnexion
              </button>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600 w-full mt-4">
                <LogIn className="h-6 w-6 mr-2" /> Connexion
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
