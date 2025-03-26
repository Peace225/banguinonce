import { useState } from "react";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Register = () => {
  const [userType, setUserType] = useState("candidat"); 
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [secteur, setSecteur] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("❌ Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      // Vérifier si l'email est déjà enregistré
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("❌ Cet email est déjà utilisé. Veuillez vous connecter.");
        setLoading(false);
        return;
      }

      // Création du compte utilisateur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Vérification email envoyée
      await sendEmailVerification(userCredential.user);

      // Sauvegarde des informations supplémentaires dans Firestore
      await setDoc(doc(db, "users", userId), {
        nom,
        email,
        telephone,
        userType,
        entreprise: userType === "recruteur" ? entreprise : "",
        secteur: userType === "recruteur" ? secteur : "",
      });

      alert("✅ Inscription réussie ! Vérifiez votre email pour l'activer.");
      navigate(userType === "recruteur" ? "/dashboard-recruteur" : "/dashboard-candidat");
    } catch (error) {
      setError("❌ Erreur d'inscription : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Inscription - BanguiNonce</title>
        <meta name="description" content="Inscrivez-vous sur BanguiNonce et accédez aux meilleures opportunités d'emploi et d'annonces." />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-blue-600 mb-2"
        >
          Inscription
        </motion.h1>

        <p className="text-gray-600 text-center max-w-lg mb-6">
          Rejoignez BanguiNonce et accédez aux **opportunités professionnelles** et aux **offres d'emploi** adaptées à votre profil.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="bg-white p-6 shadow-lg rounded-md max-w-md w-full">
          <label className="block text-gray-700 font-semibold mb-2">Vous êtes :</label>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setUserType("candidat")}
              className={`p-3 w-1/2 rounded-md transition ${
                userType === "candidat" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Candidat
            </button>
            <button
              type="button"
              onClick={() => setUserType("recruteur")}
              className={`p-3 w-1/2 rounded-md transition ${
                userType === "recruteur" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Recruteur
            </button>
          </div>

          <input type="text" placeholder="Nom complet" value={nom} onChange={(e) => setNom(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
          <input type="tel" placeholder="Numéro de téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />

          {userType === "recruteur" && (
            <>
              <input type="text" placeholder="Nom de l'entreprise" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
              <input type="text" placeholder="Secteur d'activité" value={secteur} onChange={(e) => setSecteur(e.target.value)} className="border p-3 w-full mb-4 rounded-md" required />
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">Vous avez déjà un compte ?</p>
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
