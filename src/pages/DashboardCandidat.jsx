import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Bookmark, Briefcase, User } from "lucide-react";

const DashboardCandidat = () => {
  const [offres, setOffres] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOffres = async () => {
      const offresSnapshot = await getDocs(collection(db, "offres"));
      setOffres(offresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOffres();
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Tableau de Bord - Candidat</title>
        <meta name="description" content="Consultez et postulez aux offres d'emploi sur BanguiNonce." />
      </Helmet>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">🎯 Tableau de Bord Candidat</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <button onClick={() => navigate("/profil")} className="bg-blue-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-blue-700 transition">
            <User className="h-8 w-8 mr-3" /> Modifier Profil
          </button>

          <button onClick={() => navigate("/offres")} className="bg-green-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-green-700 transition">
            <Briefcase className="h-8 w-8 mr-3" /> Voir Offres
          </button>

          <button onClick={() => navigate("/favoris")} className="bg-yellow-600 text-white p-6 rounded-md flex items-center justify-center shadow-md hover:bg-yellow-700 transition">
            <Bookmark className="h-8 w-8 mr-3" /> Offres Sauvegardées
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8">📌 Offres d'Emploi Disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {offres.length > 0 ? offres.map((offre) => (
            <div key={offre.id} className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold">{offre.titre}</h3>
              <p className="text-gray-600">{offre.entreprise}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Postuler
              </button>
            </div>
          )) : <p>Aucune offre disponible.</p>}
        </div>
      </div>
    </>
  );
};

export default DashboardCandidat;
