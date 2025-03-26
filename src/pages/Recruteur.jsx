import { useState } from "react";

const Recruteur = () => {
  const [formData, setFormData] = useState({
    titre: "",
    entreprise: "",
    localisation: "",
    typeContrat: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Offre soumise :", formData);
    alert("Votre offre a été publiée !");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-blue-600">Publier une Offre d'Emploi</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md mt-6 max-w-2xl mx-auto">
        <input type="text" name="titre" placeholder="Titre du poste" value={formData.titre} onChange={handleChange} className="border p-2 w-full mb-4" required />
        <input type="text" name="entreprise" placeholder="Nom de l'entreprise" value={formData.entreprise} onChange={handleChange} className="border p-2 w-full mb-4" required />
        <input type="text" name="localisation" placeholder="Lieu du poste" value={formData.localisation} onChange={handleChange} className="border p-2 w-full mb-4" required />
        
        <select name="typeContrat" value={formData.typeContrat} onChange={handleChange} className="border p-2 w-full mb-4" required>
          <option value="">Type de contrat</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Freelance">Freelance</option>
        </select>

        <textarea name="description" placeholder="Description du poste" value={formData.description} onChange={handleChange} className="border p-2 w-full mb-4 h-32" required></textarea>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Publier l'Offre</button>
      </form>
    </div>
  );
};

export default Recruteur;
