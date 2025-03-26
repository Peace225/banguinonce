import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // ✅ SEO Optimisé
import { motion } from "framer-motion"; // ✅ Animations
import { Car, MapPin, DollarSign, Calendar, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react"; // ✅ Carrousel des images
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Automobile = () => {
  const [voitures, setVoitures] = useState([]);
  const [filteredVoitures, setFilteredVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("location"); // ✅ Filtrage par type : location ou vente

  useEffect(() => {
    fetch("https://api.banguinonce.com/automobiles") // ✅ API des véhicules
      .then((res) => res.json())
      .then((data) => {
        setVoitures(data);
        filtrerVoitures("location", data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des véhicules.");
        // ✅ Données fictives en cas d'échec de l'API
        const mockData = [
          { id: 1, titre: "Toyota Corolla 2021", type: "location", prix: "20 000 FCFA / jour", localisation: "Bangui", images: ["/images/car1.jpg", "/images/car2.jpg"] },
          { id: 2, titre: "Mercedes-Benz GLE", type: "vente", prix: "18 000 000 FCFA", localisation: "Bangui", images: ["/images/car3.jpg", "/images/car4.jpg"] },
          { id: 3, titre: "Hyundai Tucson", type: "location", prix: "25 000 FCFA / jour", localisation: "PK12", images: ["/images/car5.jpg", "/images/car6.jpg"] },
          { id: 4, titre: "Honda CR-V", type: "vente", prix: "15 500 000 FCFA", localisation: "Centre-Ville", images: ["/images/car7.jpg", "/images/car8.jpg"] },
        ];
        setVoitures(mockData);
        filtrerVoitures("location", mockData);
        setLoading(false);
      });
  }, []);

  // ✅ Fonction de filtrage des véhicules
  const filtrerVoitures = (selectedType, data = voitures) => {
    const filtered = data.filter((voiture) => voiture.type === selectedType);
    setFilteredVoitures(filtered);
  };

  return (
    <>
      {/* ✅ Optimisation SEO */}
      <Helmet>
        <title>Véhicules à Louer et à Vendre - BanguiNonce</title>
        <meta name="description" content="Trouvez des véhicules en location ou en vente à Bangui et ses environs. Réservez dès maintenant." />
      </Helmet>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">🚗 Véhicules Disponibles</h1>

        {/* ✅ Filtre : Location ou Vente */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => { setType("location"); filtrerVoitures("location"); }}
            className={`px-6 py-3 rounded-md transition ${type === "location" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Location
          </button>
          <button
            onClick={() => { setType("vente"); filtrerVoitures("vente"); }}
            className={`px-6 py-3 rounded-md transition ${type === "vente" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Vente
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Chargement des véhicules...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredVoitures.map((voiture) => (
              <motion.div
                key={voiture.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md p-6 rounded-md"
              >
                {/* ✅ Diaporama des images du véhicule */}
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  className="w-full h-48"
                >
                  {voiture.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={voiture.titre} className="w-full h-48 object-cover rounded-md" />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <h2 className="text-xl font-bold mt-4">{voiture.titre}</h2>

                {/* ✅ Localisation */}
                <div className="flex items-center mt-2 text-gray-700">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" /> {voiture.localisation}
                </div>

                {/* ✅ Prix */}
                <div className="flex items-center mt-2 text-gray-700">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" /> {voiture.prix}
                </div>

                {/* ✅ Type : Location ou Vente */}
                <div className="flex items-center mt-2 text-gray-700">
                  {voiture.type === "location" ? (
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  ) : (
                    <ShoppingBag className="h-5 w-5 mr-2 text-orange-500" />
                  )}
                  {voiture.type === "location" ? "Location" : "Vente"}
                </div>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition">
                  Voir Détails
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Automobile;
