import { useState, useEffect } from "react";
import CardAnnonce from "../components/CardAnnonce";

const Electronique = () => {
  const [emplois, setEmplois] = useState([]);

  useEffect(() => {
    fetch("https://api.banguinonce.com/annonces?categorie=emploi") // API fictive
      .then((res) => res.json())
      .then((data) => setEmplois(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center">Offres d'Emploi</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {emplois.map((emploi) => (
          <CardAnnonce key={emploi.id} annonce={emploi} />
        ))}
      </div>
    </div>
  );
};

export default Electronique;
