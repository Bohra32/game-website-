import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux"; 
import { Toast, ToastContainer } from 'react-bootstrap';
import HomePage from "./pages/HomePage";
import GameDetails from "./pages/GameDetails";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import "./styles/global.css";
import Default from "./components/Default";

const App = () => {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); 

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        setToastMessage("Please log in to access the Library.");
        setToastType("danger");
        setShowToast(true);
      } else if (user && isAuthenticated) {
        setToastMessage(`Welcome, ${user.firstName}! 🎉`);
        setToastType("success");
        setShowToast(true);
      }
    }
  }, [userId, isLoaded, user, isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="game/:id" element={<GameDetails />} />
          <Route path="library" element={userId ? <Library /> : <Default />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Bootstrap Toast Container */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastType}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default App;
