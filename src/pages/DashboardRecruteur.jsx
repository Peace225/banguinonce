import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PlusCircle, ClipboardList, Briefcase } from "lucide-react";

const DashboardRecruteur = () => {
  const [offres, setOffres] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const fetchOffres = async () => {
      const q = query(collection(db, "offres"), where("userId", "==", user.uid));
      const offresSnapshot = await getDocs(q);
      setOffres(offresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOffres();
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Tableau de Bord - Recruteur</title>
        <meta name="description" content="Gérez vos offres d'emploi et annonces sur BanguiNonce." />
      </Helmet>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">👨‍💼 Tableau de Bord Recruteur</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <button onClick={() => navigate("/publier-offre")} className="bg-blue-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-blue-700 transition">
            <PlusCircle className="h-8 w-8 mr-3" /> Publier une Offre
          </button>

          <button onClick={() => navigate("/publier-annonce")} className="bg-green-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-green-700 transition">
            <ClipboardList className="h-8 w-8 mr-3" /> Publier une Annonce
          </button>

          <button onClick={() => navigate("/candidatures")} className="bg-yellow-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-yellow-700 transition">
            <Briefcase className="h-8 w-8 mr-3" /> Voir Candidatures
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8">📌 Vos Offres d'Emploi</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {offres.length > 0 ? offres.map((offre) => (
            <div key={offre.id} className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold">{offre.titre}</h3>
              <p className="text-gray-600">{offre.entreprise}</p>
              <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Supprimer
              </button>
            </div>
          )) : <p>Aucune offre publiée.</p>}
        </div>
      </div>
    </>
  );
};

export default DashboardRecruteur;
