import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Emploi = () => {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la recherche et le filtre
  const [searchQuery, setSearchQuery] = useState("");
  const [categorie, setCategorie] = useState("");

  // Liste complète des catégories d'emploi
  const categories = [
    "Agriculture", "Bâtiment", "Biologie", "Commerce/Vente", "Éducation/Enseignement",
    "Électronique", "Élevage", "Environnement", "Finances/Comptabilité", "Droit",
    "Informatique", "Design", "Marketing", "Administration", "Santé", "Tourisme/Hôtellerie",
    "Transport & Logistique", "Ressources Humaines", "Communication", "Journalisme", "Sécurité"
  ];

  useEffect(() => {
    fetch("https://api.banguinonce.com/emplois") // API fictive
      .then((res) => res.json())
      .then((data) => {
        setOffres(data);
        setFilteredOffres(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des offres d'emploi");
        const mockData = [
          { id: 1, titre: "Développeur Full Stack", entreprise: "Tech Corp", localisation: "Bangui", categorie: "Informatique", image: "/images/dev.jpg" },
          { id: 2, titre: "Designer UX/UI", entreprise: "Design SA", localisation: "Douala", categorie: "Design", image: "/images/design.jpg" },
          { id: 3, titre: "Responsable Marketing", entreprise: "MarketPro", localisation: "Yaoundé", categorie: "Marketing", image: "/images/marketing.jpg" },
          { id: 4, titre: "Assistant Administratif", entreprise: "Banque Centrale", localisation: "Bangui", categorie: "Administration", image: "/images/admin.jpg" }
        ];
        setOffres(mockData);
        setFilteredOffres(mockData);
        setLoading(false);
      });
  }, []);

  // Fonction de filtrage par recherche et catégorie
  useEffect(() => {
    let resultatsFiltres = offres;

    if (searchQuery) {
      resultatsFiltres = resultatsFiltres.filter((offre) =>
        offre.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offre.entreprise.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categorie) {
      resultatsFiltres = resultatsFiltres.filter((offre) => offre.categorie === categorie);
    }

    setFilteredOffres(resultatsFiltres);
  }, [searchQuery, categorie, offres]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">💼 Offres d'Emploi</h1>

      {/* SECTION RECHERCHE & FILTRE */}
      <div className="grid md:grid-cols-4 gap-6">
        
        {/* LISTE DES CATÉGORIES (COLONNE GAUCHE) */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">📂 Catégories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li 
                key={cat}
                className={`cursor-pointer p-2 rounded-md ${
                  categorie === cat ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setCategorie(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* BARRE DE RECHERCHE & LISTE DES OFFRES */}
        <div className="md:col-span-3">
          <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
            <h2 className="text-xl font-bold flex items-center"><Filter className="mr-2" /> Rechercher un Emploi</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              
              {/* CHAMP DE RECHERCHE */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un poste, une entreprise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border p-3 rounded-md w-full pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* AFFICHAGE DES OFFRES */}
          {loading ? (
            <p className="text-center text-gray-600">Chargement des offres d'emploi...</p>
          ) : filteredOffres.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffres.map((offre) => (
                <div key={offre.id} className="bg-white shadow-md p-4 rounded-md">
                  <img src={offre.image} alt={offre.titre} className="w-full h-40 object-cover rounded-md" />
                  <h2 className="text-xl font-bold mt-3">{offre.titre}</h2>
                  <p className="text-gray-600">{offre.entreprise} - {offre.localisation}</p>
                  <p className="mt-2 text-sm text-gray-500">Catégorie: {offre.categorie}</p>
                  <button onClick={() => navigate(`/emploi/${offre.id}`)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition">
                    Voir Détails
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Aucune offre ne correspond à vos critères.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emploi;
