import { useState } from "react";

const Candidat = () => {
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");

  const handleCvUpload = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cv) {
      setMessage("CV téléchargé avec succès !");
    } else {
      setMessage("Veuillez sélectionner un fichier.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-green-600">Déposer Votre CV</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md mt-6 max-w-2xl mx-auto">
        <label className="block text-gray-700 mb-2">Téléchargez votre CV :</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="border p-2 w-full mb-4" required />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md w-full">Déposer le CV</button>
      </form>

      {message && <p className="text-center text-gray-700 mt-4">{message}</p>}

      <h2 className="text-xl font-bold mt-8 text-center">📢 Offres d’Emploi Disponibles</h2>
      <div className="mt-4 p-4 border rounded-md bg-gray-100">
        <p><strong>Développeur Web</strong> - CDI - Bangui</p>
        <p><strong>Assistant RH</strong> - Stage - Douala</p>
        <p><strong>Comptable Senior</strong> - CDD - Abidjan</p>
      </div>
    </div>
  );
};

export default Candidat;
