import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EmploiDetail = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.banguinonce.com/emplois/${id}`) // API fictive
      .then((res) => res.json())
      .then((data) => {
        setOffre(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des détails de l'offre");
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-gray-600">Chargement des détails...</p>
      ) : offre ? (
        <div className="bg-white shadow-md p-6 rounded-md max-w-2xl mx-auto">
          <img src={offre.image} alt={offre.titre} className="w-full h-64 object-cover rounded-md" />
          <h1 className="text-3xl font-bold mt-4">{offre.titre}</h1>
          <p className="text-gray-600 mt-2">Entreprise : {offre.entreprise}</p>
          <p className="text-gray-600">Localisation : {offre.localisation}</p>
          <p className="text-gray-600 mt-2">Catégorie : {offre.categorie}</p>
          <p className="mt-4">{offre.description || "Aucune description fournie pour cette offre."}</p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucune offre trouvée.</p>
      )}
    </div>
  );
};

export default EmploiDetail;
