import { useState, useEffect } from "react";
import CardAnnonce from "../components/CardAnnonce";
import Filtres from "../components/Filtres";

const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);

  useEffect(() => {
    fetch("https://api.banguinonce.com/annonces") // API fictive
      .then((res) => res.json())
      .then((data) => {
        setAnnonces(data);
        setFilteredAnnonces(data);
      });
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = annonces;

    if (filters.categorie) {
      filtered = filtered.filter((annonce) => annonce.categorie === filters.categorie);
    }
    if (filters.prixMin) {
      filtered = filtered.filter((annonce) => annonce.prix >= filters.prixMin);
    }
    if (filters.prixMax) {
      filtered = filtered.filter((annonce) => annonce.prix <= filters.prixMax);
    }
    if (filters.localisation) {
      filtered = filtered.filter((annonce) => annonce.localisation.toLowerCase().includes(filters.localisation.toLowerCase()));
    }
    if (filters.date) {
      filtered = filtered.filter((annonce) => new Date(annonce.date) >= new Date(filters.date));
    }

    setFilteredAnnonces(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center">Toutes les Annonces</h1>

      {/* Composant de filtres */}
      <Filtres onFilterChange={handleFilterChange} />

      {/* Liste des annonces filtrées */}
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {filteredAnnonces.length > 0 ? (
          filteredAnnonces.map((annonce) => <CardAnnonce key={annonce.id} annonce={annonce} />)
        ) : (
          <p className="text-center text-gray-600 col-span-3">Aucune annonce trouvée</p>
        )}
      </div>
    </div>
  );
};

export default Annonces;
