import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // ✅ SEO Optimisé
import CardAnnonce from "../components/CardAnnonce";
import { 
  Search, Briefcase, Home as HomeIcon, Car, FileText
} from "lucide-react"; 
import { Link } from "react-router-dom";
import ChatPopup from "../components/ChatPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Actualites from "./Actualites";

// ✅ Données de secours (si l'API ne fonctionne pas)
const annoncesMock = [
  { id: 1, titre: "Offre d'emploi - Développeur Web", description: "CDI - Expérience requise 3 ans", categorie: "Emploi", image: "/images/emploi.jpg" },
  { id: 2, titre: "Maison à vendre à Bangui", description: "Superbe villa moderne", categorie: "Immobilier", image: "/images/maison.jpg" },
  { id: 3, titre: "Toyota Corolla 2020", description: "Excellent état - Faible kilométrage", categorie: "Automobile", image: "/images/voiture.jpg" },
  { id: 4, titre: "Appel d'Offres - Fourniture de Matériel", description: "Date limite : 20 Avril 2025", categorie: "Appels d'Offres", image: "/images/appels-offres.jpg" }
];

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://api.banguinonce.com/annonces")
      .then((res) => res.json())
      .then((data) => setAnnonces(data))
      .catch(() => {
        console.error("⚠️ Erreur de récupération des annonces, affichage des annonces de secours.");
        setAnnonces(annoncesMock);
      });
  }, []);

  return (
    <>
      {/* ✅ Optimisation SEO */}
      <Helmet>
        <title>Accueil - BanguiNonce | Petites Annonces, Emploi et Immobilier</title>
        <meta name="description" content="Trouvez ou publiez vos annonces sur BanguiNonce : Emploi, Immobilier, Automobile et Appels d'Offres." />
        <meta name="keywords" content="annonces Bangui, emploi, immobilier, automobile, appels d'offres" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Trouvez ou publiez vos annonces en toute simplicité !</h1>
        <p className="mt-2 text-lg">BanguiNonce, la plateforme n°1 pour l'emploi, l'immobilier, l'automobile et les appels d'offres.</p>
        
        {/* 🔍 Barre de Recherche */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-2/3 md:w-1/3 border rounded-l-md text-gray-700"
          />
          <button className="bg-yellow-500 p-3 rounded-r-md text-white">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* CATEGORIES POPULAIRES */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center">Catégories Populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
          <Link to="/immobilier" className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition">
            <HomeIcon className="mx-auto h-10 w-10 text-blue-600" />
            <p className="mt-2">Immobilier</p>
          </Link>
          <Link to="/automobile" className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition">
            <Car className="mx-auto h-10 w-10 text-red-600" />
            <p className="mt-2">Automobile</p>
          </Link>
          <Link to="/emploi" className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition">
            <Briefcase className="mx-auto h-10 w-10 text-green-600" />
            <p className="mt-2">Emploi</p>
          </Link>
          <Link to="/appelsoffres" className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition">
            <FileText className="mx-auto h-10 w-10 text-purple-600" />
            <p className="mt-2">Appels d'Offres</p>
          </Link>
        </div>
      </div>

      {/* 🏆 CARROUSEL DES DERNIÈRES ANNONCES */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center">Les Dernières Annonces</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 3 } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mt-6"
        >
          {annonces.length > 0 ? (
            annonces.map((annonce) => (
              <SwiperSlide key={annonce.id}>
                <CardAnnonce annonce={annonce} />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-600">Aucune annonce disponible</p>
          )}
        </Swiper>
      </div>

      {/* 📢 Section Actualités */}
      <Actualites />

      {/* 💬 Pop-up de discussion */}
      <ChatPopup />
    </>
  );
};

export default Home;
