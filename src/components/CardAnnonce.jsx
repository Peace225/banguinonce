import { Link } from "react-router-dom";

const CardAnnonce = ({ annonce }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img src={annonce.image} alt={annonce.titre} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{annonce.titre}</h3>
      <p className="text-gray-600">{annonce.categorie}</p>
      <p className="text-blue-500 font-bold">{annonce.prix} FCFA</p>
      <Link to={`/annonce/${annonce.id}`} className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 mt-2 rounded-md block text-center">
        Voir l’annonce
      </Link>
    </div>
  );
};

export default CardAnnonce;
