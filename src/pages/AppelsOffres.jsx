import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Helmet } from "react-helmet-async"; // ✅ SEO Optimisé

const AppelsOffres = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la recherche et le filtre
  const [searchQuery, setSearchQuery] = useState("");
  const [categorie, setCategorie] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const offresParPage = 6; // Nombre d'offres par page

  // Liste des catégories d'appels d'offres
  const categories = [
    "Informatique", "Bâtiment", "Santé", "Éducation", "Transport", "Énergie",
    "Agriculture", "Commerce", "Finance", "Environnement"
  ];

  useEffect(() => {
    fetch("https://api.banguinonce.com/appels-offres") // ✅ Remplacez par votre API réelle
      .then((res) => res.json())
      .then((data) => {
        setOffres(data);
        setFilteredOffres(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des appels d'offres.");
        // ✅ Données de secours si l'API est hors ligne
        setOffres([
          { id: 1, titre: "Consultant en IT", entreprise: "Tech Africa", categorie: "Informatique", deadline: "2025-04-15" },
          { id: 2, titre: "Travaux de Construction", entreprise: "BTP Plus", categorie: "Bâtiment", deadline: "2025-05-01" },
          { id: 3, titre: "Fourniture d'Équipements Médicaux", entreprise: "MediCare", categorie: "Santé", deadline: "2025-04-20" },
          { id: 4, titre: "Transport de Matériel Scolaire", entreprise: "EduTrans", categorie: "Transport", deadline: "2025-04-30" },
          { id: 5, titre: "Développement d'une Application Mobile", entreprise: "CodeX", categorie: "Informatique", deadline: "2025-05-10" },
          { id: 6, titre: "Audit Financier d'une Banque", entreprise: "Finance Conseil", categorie: "Finance", deadline: "2025-05-12" }
        ]);
        setFilteredOffres(offres);
        setLoading(false);
      });
  }, []);

  // Fonction de filtrage dynamique
  const filtrerOffres = () => {
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
    setCurrentPage(1); // ✅ Reset de la pagination après filtre
  };

  // Pagination : Découpage des offres par page
  const indexOfLastOffre = currentPage * offresParPage;
  const indexOfFirstOffre = indexOfLastOffre - offresParPage;
  const offresActuelles = filteredOffres.slice(indexOfFirstOffre, indexOfLastOffre);

  return (
    <>
      {/* ✅ Optimisation SEO */}
      <Helmet>
        <title>Appels d'Offres - BanguiNonce</title>
        <meta name="description" content="Consultez les derniers appels d'offres en Centrafrique. Recherchez et postulez dès maintenant sur BanguiNonce." />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">📢 Appels d'Offres</h1>

        {/* ✅ Recherche et Filtrage */}
        <div className="grid md:grid-cols-4 gap-6">
          
          {/* Catégories */}
          <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">📂 Catégories</h2>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li 
                  key={cat}
                  className={`cursor-pointer p-2 rounded-md ${
                    categorie === cat ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setCategorie(cat === categorie ? "" : cat);
                    filtrerOffres();
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Barre de recherche et Liste des offres */}
          <div className="md:col-span-3">
            <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-bold flex items-center"><Filter className="mr-2" /> Rechercher un Appel d'Offre</h2>
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Rechercher par titre ou entreprise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border p-3 rounded-md w-full pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              </div>
              <button
                onClick={filtrerOffres}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
              >
                Appliquer les Filtres
              </button>
            </div>

            {/* ✅ Affichage des offres */}
            {loading ? (
              <p className="text-center text-gray-600">Chargement des appels d'offres...</p>
            ) : offresActuelles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offresActuelles.map((offre) => (
                  <div key={offre.id} className="bg-white shadow-md p-4 rounded-md">
                    <h2 className="text-xl font-bold">{offre.titre}</h2>
                    <p className="text-gray-600">{offre.entreprise}</p>
                    <p className="mt-2 text-sm text-gray-500">Catégorie: {offre.categorie}</p>
                    <p className="mt-2 text-sm text-red-500">📅 Deadline: {offre.deadline}</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition">
                      Voir Détails
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">Aucun appel d'offre trouvé.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppelsOffres;
