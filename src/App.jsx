import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recruteur from "./pages/Recruteur";
import Candidat from "./pages/Candidat";
import Profil from "./pages/Profil";
import Immobilier from "./pages/Immobilier";
import Emploi from "./pages/Emploi";
import AppelsOffres from "./pages/AppelsOffres";
import NosServices from "./pages/NosServices";
import Automobile from "./pages/Automobile";
import DashboardRecruteur from "./pages/DashboardRecruteur";
import DashboardCandidat from "./pages/DashboardCandidat";
import ProtectedRoute from "./components/ProtectedRoute";

/** ✅ Détection des pages qui ne doivent PAS afficher la Navbar */
function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Pages protégées */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path="/immobilier" element={<ProtectedRoute><Immobilier /></ProtectedRoute>} />
        <Route path="/emploi" element={<ProtectedRoute><Emploi /></ProtectedRoute>} />
        <Route path="/appelsoffres" element={<ProtectedRoute><AppelsOffres /></ProtectedRoute>} />
        <Route path="/nosservices" element={<ProtectedRoute><NosServices /></ProtectedRoute>} />
        <Route path="/automobile" element={<ProtectedRoute><Automobile /></ProtectedRoute>} />
        <Route path="/recruteur" element={<ProtectedRoute><Recruteur /></ProtectedRoute>} />
        <Route path="/candidat" element={<ProtectedRoute><Candidat /></ProtectedRoute>} />

        {/* ✅ Dashboards dynamiques selon le rôle */}
        <Route path="/dashboard-recruteur" element={<ProtectedRoute><DashboardRecruteur /></ProtectedRoute>} />
        <Route path="/dashboard-candidat" element={<ProtectedRoute><DashboardCandidat /></ProtectedRoute>} />

        {/* ✅ Redirection selon rôle après connexion */}
        <Route path="/dashboard" element={<RedirectAfterLogin />} />
      </Routes>
    </>
  );
}

/** ✅ Redirection après connexion selon le rôle */
function RedirectAfterLogin() {
  const { user, userData } = useAuth(); 

  if (!user) return <Navigate to="/login" replace />;

  if (userData?.userType === "recruteur") {
    return <Navigate to="/dashboard-recruteur" replace />;
  } else {
    return <Navigate to="/dashboard-candidat" replace />;
  }
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
