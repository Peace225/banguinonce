import { useState } from "react";

const Filtres = ({ onFilterChange }) => {
  const [categorie, setCategorie] = useState("");
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [date, setDate] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      categorie,
      prixMin,
      prixMax,
      localisation,
      date,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md flex flex-wrap gap-4">
      {/* Filtre Catégorie */}
      <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="border p-2 rounded-md">
        <option value="">Toutes les Catégories</option>
        <option value="emploi">Emploi</option>
        <option value="immobilier">Immobilier</option>
        <option value="automobile">Automobile</option>
        <option value="electronique">Électronique</option>
        <option value="mode">Mode</option>
        <option value="services">Services</option>
      </select>

      {/* Filtre Prix */}
      <input
        type="number"
        placeholder="Prix Min"
        value={prixMin}
        onChange={(e) => setPrixMin(e.target.value)}
        className="border p-2 rounded-md"
      />
      <input
        type="number"
        placeholder="Prix Max"
        value={prixMax}
        onChange={(e) => setPrixMax(e.target.value)}
        className="border p-2 rounded-md"
      />

      {/* Filtre Localisation */}
      <input
        type="text"
        placeholder="Localisation"
        value={localisation}
        onChange={(e) => setLocalisation(e.target.value)}
        className="border p-2 rounded-md"
      />

      {/* Filtre Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded-md"
      />

      {/* Bouton Filtrer */}
      <button onClick={handleFilterChange} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Appliquer les Filtres
      </button>
    </div>
  );
};

export default Filtres;
