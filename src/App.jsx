import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Index from "./Pages/Index";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import About from "./Pages/About";
import Administration from "./Pages/AdministrationP";
import Statements from "./Pages/StatementsP";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Apply from "./Pages/Apply";
import AdmissionsProcess from "./Pages/AdmissionProcess";
import FeesStructure from "./Pages/FeesStructure";
import Curriculum from "./Pages/Curriculum";
import Message from "./Pages/Dashboard/Message";
import Calendar from "./Pages/Calendar";
import Clubs from "./Pages/Clubs";
import Sports from "./Pages/Sports";
import Gallery from "./Pages/Gallery";
import ContactUs from "./Pages/ContactUs";
import Gallery1 from "./Pages/Dashboard/GalleryDash";
import BackToTop from "./Components/BackToTop";
import ScrollToTop from "./Components/ScrollToTop";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} caseSensitive={false} />
            <Route
              path="/administration"
              element={<Administration />}
              caseSensitive={false}
            />
            <Route
              path="/mission-vision"
              element={<Statements />}
              caseSensitive={false}
            />
            <Route path="/apply" element={<Apply />} caseSensitive={false} />
            <Route path="/admission-overview" element={<AdmissionsProcess />} caseSensitive={false} />
            <Route path="/fees-structure" element={<FeesStructure />} caseSensitive={false} />
            <Route path="/curriculum" element={<Curriculum />} caseSensitive={false} />
            <Route path="/academic-calendar" element={<Calendar />} caseSensitive={false} />
            <Route path="/student-clubs" element={<Clubs />} caseSensitive={false} />
            <Route path="/sports-athletics" element={<Sports />} caseSensitive={false} />
            <Route path="/gallery" element={<Gallery />} caseSensitive={false} />
            <Route path="/contact-us" element={<ContactUs />} caseSensitive={false} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/messages"
              element={
                <RequireAuth>
                  <Message />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/gallery"
              element={
                <RequireAuth>
                  <Gallery1 />
                </RequireAuth>
              }
            />
          </Routes>
          <BackToTop />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
