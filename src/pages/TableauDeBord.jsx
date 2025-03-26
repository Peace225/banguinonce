import { useEffect, useState } from "react";

const TableauDeBord = () => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    fetch("https://api.banguinonce.com/offres") // Remplacez par votre API backend
      .then((res) => res.json())
      .then((data) => setOffres(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center">Tableau de Bord</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {offres.length > 0 ? (
          offres.map((offre) => (
            <div key={offre.id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{offre.titre}</h3>
              <p className="text-gray-600">{offre.entreprise}</p>
              <p className="text-blue-500 font-bold">{offre.localisation}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">Aucune offre disponible</p>
        )}
      </div>
    </div>
  );
};

export default TableauDeBord;
