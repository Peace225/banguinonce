import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // ✅ SEO Optimisé
import { motion } from "framer-motion"; // ✅ Animations
import { Briefcase, Home, Wrench, ShieldCheck, Users, Globe } from "lucide-react"; // ✅ Icônes des services

const NosServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.banguinonce.com/services") // ✅ API des services
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des services.");
        // ✅ Données fictives en cas d'échec de l'API
        setServices([
          { id: 1, titre: "Emploi & Recrutement", description: "Trouvez votre futur emploi ou recrutez les meilleurs talents.", icon: <Briefcase className="h-10 w-10 text-blue-600" /> },
          { id: 2, titre: "Immobilier", description: "Achetez, louez ou vendez des biens immobiliers en toute simplicité.", icon: <Home className="h-10 w-10 text-green-600" /> },
          { id: 3, titre: "Réparation & Maintenance", description: "Besoin d'un artisan ? Trouvez un professionnel près de chez vous.", icon: <Wrench className="h-10 w-10 text-red-600" /> },
          { id: 4, titre: "Sécurité & Protection", description: "Des solutions pour assurer votre sécurité et celle de vos biens.", icon: <ShieldCheck className="h-10 w-10 text-purple-600" /> },
          { id: 5, titre: "Services aux entreprises", description: "Bénéficiez de solutions adaptées aux besoins des entreprises.", icon: <Users className="h-10 w-10 text-yellow-600" /> },
          { id: 6, titre: "Consulting & Conseils", description: "Obtenez l'expertise nécessaire pour réussir vos projets.", icon: <Globe className="h-10 w-10 text-indigo-600" /> }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* ✅ Optimisation SEO */}
      <Helmet>
        <title>Nos Services - BanguiNonce</title>
        <meta name="description" content="Découvrez tous les services disponibles sur BanguiNonce, allant du recrutement à l'immobilier et bien plus encore." />
      </Helmet>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">🌍 Nos Services</h1>
        
        {loading ? (
          <p className="text-center text-gray-600">Chargement des services...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md p-6 rounded-md flex flex-col items-center text-center"
              >
                {service.icon}
                <h2 className="text-xl font-bold mt-4">{service.titre}</h2>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  En savoir plus
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NosServices;
