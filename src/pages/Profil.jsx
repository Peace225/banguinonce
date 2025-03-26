import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, db, storage } from "../utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

const Profil = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "https://via.placeholder.com/150",
    bio: "",
    location: "",
    skills: "",
  });

  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Charger les données utilisateur depuis Firestore
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const profileRef = doc(db, "users", user.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfileData(profileSnap.data());
          } else {
            setProfileData({
              displayName: user.displayName || "Utilisateur",
              email: user.email || "",
              photoURL: user.photoURL || "https://via.placeholder.com/150",
              bio: "",
              location: "",
              skills: "",
            });
          }
        } catch (error) {
          console.error("❌ Erreur de chargement du profil :", error);
          setErrorMessage("Impossible de charger le profil. Veuillez réessayer.");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user]);

  // ✅ Fonction pour enregistrer les mises à jour du profil
  const handleSaveProfile = async () => {
    if (!user) {
      setErrorMessage("Utilisateur non connecté. Veuillez vous reconnecter.");
      return;
    }

    try {
      setErrorMessage(""); // Réinitialiser les erreurs
      const profileRef = doc(db, "users", user.uid);
      await updateDoc(profileRef, profileData);
      alert("✅ Profil mis à jour avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du profil :", error);
      setErrorMessage("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  // ✅ Fonction d'upload d'image avec suivi en temps réel
  const handleImageUpload = async () => {
    if (!image || !user) {
      setErrorMessage("Aucune image sélectionnée ou utilisateur non connecté.");
      return;
    }

    try {
      setErrorMessage("");
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("❌ Erreur d'upload :", error);
          setErrorMessage("Erreur lors de l'upload de l'image.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProfileData((prev) => ({ ...prev, photoURL: downloadURL }));

          const profileRef = doc(db, "users", user.uid);
          await updateDoc(profileRef, { photoURL: downloadURL });

          alert("✅ Photo de profil mise à jour !");
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("❌ Erreur d'upload :", error);
      setErrorMessage("Une erreur s'est produite lors de l'upload.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Chargement du profil...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center">
        {/* ✅ Affichage des erreurs */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* ✅ Photo de profil */}
        <motion.img
          src={profileData.photoURL}
          alt="Profil"
          className="w-32 h-32 border-4 border-white rounded-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* ✅ Upload Image */}
        <label className="bg-gray-800 text-white px-3 py-1 mt-2 rounded-md cursor-pointer text-sm">
          Modifier photo
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
        </label>

        {/* ✅ Bouton d'upload et affichage du pourcentage de progression */}
        {image && (
          <button onClick={handleImageUpload} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md">
            {uploadProgress > 0 ? `Téléchargement... ${uploadProgress}%` : "Enregistrer"}
          </button>
        )}

        {/* ✅ Formulaire d'édition du profil */}
        <div className="w-full max-w-md mt-6">
          <label className="text-gray-700 font-semibold">Nom :</label>
          <input
            type="text"
            value={profileData.displayName}
            onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
            className="border p-2 w-full rounded-md mb-4"
          />

          <label className="text-gray-700 font-semibold">Bio :</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            className="border p-2 w-full rounded-md mb-4"
          />

          <label className="text-gray-700 font-semibold">Localisation :</label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
            className="border p-2 w-full rounded-md mb-4"
          />

          <label className="text-gray-700 font-semibold">Compétences :</label>
          <input
            type="text"
            value={profileData.skills}
            onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
            className="border p-2 w-full rounded-md mb-4"
          />

          {/* ✅ Bouton d'enregistrement */}
          <button onClick={handleSaveProfile} className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
            Enregistrer le Profil
          </button>

          {/* ✅ Bouton de déconnexion */}
          <button onClick={() => auth.signOut()} className="bg-red-600 text-white px-4 py-2 rounded-md w-full mt-4">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
