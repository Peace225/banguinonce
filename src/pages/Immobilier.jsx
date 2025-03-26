import { useState, useEffect } from "react";
import { MapPin, Home, Bed, DollarSign, Filter } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Immobilier = () => {
  const [logements, setLogements] = useState([]);
  const [filteredLogements, setFilteredLogements] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [type, setType] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [localisation, setLocalisation] = useState("");

  useEffect(() => {
    fetch("https://api.banguinonce.com/immobilier") // API fictive
      .then((res) => res.json())
      .then((data) => {
        setLogements(data);
        setFilteredLogements(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des logements");
        const mockData = [
          { id: 1, titre: "Appartement Moderne à Louer", type: "Appartement", prix: 250000, pieces: 3, localisation: "Bangui", images: ["/images/immo1.jpeg", "/images/immo2.jpeg", "/images/immo3.jpeg"] },
          { id: 2, titre: "Villa avec Piscine", type: "Villa", prix: 500000, pieces: 5, localisation: "Bangui", images: ["/images/immo4.jpeg", "/images/immo5.jpeg", "/images/immo6.jpeg"] },
          { id: 3, titre: "Studio Meublé - Court Séjour", type: "Studio", prix: 15000, pieces: 1, localisation: "Centre-Ville", images: ["/images/immo7.jpeg", "/images/immo2.jpeg", "/images/immo3.jpeg"] },
          { id: 4, titre: "Maison Familiale Spacieuse", type: "Maison", prix: 350000, pieces: 4, localisation: "PK12", images: ["/images/immo5.", "/images/immo6.jpeg", "/images/immo7.jpeg"] }
        ];
        setLogements(mockData);
        setFilteredLogements(mockData);
        setLoading(false);
      });
  }, []);

  // Fonction de filtrage
  const filtrerLogements = () => {
    let resultatsFiltres = logements;

    if (type) {
      resultatsFiltres = resultatsFiltres.filter((logement) => logement.type === type);
    }

    if (prixMax) {
      resultatsFiltres = resultatsFiltres.filter((logement) => logement.prix <= prixMax);
    }

    if (localisation) {
      resultatsFiltres = resultatsFiltres.filter((logement) => logement.localisation.toLowerCase().includes(localisation.toLowerCase()));
    }

    setFilteredLogements(resultatsFiltres);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏡 Annonces Immobilières</h1>

      {/* SECTION FILTRE */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-bold flex items-center"><Filter className="mr-2" /> Filtrer les Annonces</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {/* FILTRE PAR TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-3 rounded-md w-full"
          >
            <option value="">Toutes les catégories</option>
            <option value="Appartement">Appartement</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
            <option value="Maison">Maison</option>
          </select>

          {/* FILTRE PAR PRIX */}
          <input
            type="number"
            placeholder="Prix max (FCFA)"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
            className="border p-3 rounded-md w-full"
          />

          {/* FILTRE PAR LOCALISATION */}
          <input
            type="text"
            placeholder="Rechercher par Localisation"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            className="border p-3 rounded-md w-full"
          />
        </div>

        {/* BOUTON FILTRER */}
        <button
          onClick={filtrerLogements}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
        >
          Appliquer les Filtres
        </button>
      </div>

      {/* AFFICHAGE DES ANNONCES */}
      {loading ? (
        <p className="text-center text-gray-600">Chargement des annonces...</p>
      ) : filteredLogements.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredLogements.map((logement) => (
            <div key={logement.id} className="bg-white shadow-md p-4 rounded-md">
              {/* CARROUSEL D'IMAGES */}
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                className="rounded-md"
              >
                {logement.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={logement.titre} className="w-full h-48 object-cover rounded-md" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <h2 className="text-xl font-bold mt-4">{logement.titre}</h2>
              <p className="text-gray-600">{logement.type}</p>
              
              <div className="flex items-center mt-2 text-gray-700">
                <MapPin className="h-5 w-5 mr-2 text-red-500" /> {logement.localisation}
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <Bed className="h-5 w-5 mr-2 text-blue-500" /> {logement.pieces} pièces
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <DollarSign className="h-5 w-5 mr-2 text-green-500" /> {logement.prix.toLocaleString()} FCFA
              </div>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition">
                Voir Détails
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucune annonce ne correspond à vos critères.</p>
      )}
    </div>
  );
};

export default Immobilier;
