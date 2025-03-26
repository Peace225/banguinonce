import { useState, useEffect } from "react";

const Actualites = () => {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.banguinonce.com/actualites") // API fictive
      .then((res) => res.json())
      .then((data) => {
        setActualites(data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Erreur de récupération des actualités");
        setActualites([
          { id: 1, titre: "Nouveau service disponible", description: "Découvrez nos nouvelles fonctionnalités." },
          { id: 2, titre: "Événement à venir", description: "Participez à notre conférence en ligne." }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center">Actualités</h1>
      {loading ? (
        <p className="text-center mt-4">Chargement des actualités...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {actualites.map((actu) => (
            <div key={actu.id} className="bg-white shadow-md p-4 rounded-md">
              <h2 className="text-xl font-bold">{actu.titre}</h2>
              <p className="text-gray-600 mt-2">{actu.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Actualites;
