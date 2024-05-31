import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "./NavbarContext";
import AirPhone from "./components/AirPhone";
import AirTab from "./components/AirTab";
import AirGlass from "./components/AirGlass";
import LandingPage from "./components/LandingPage";
import BasketPage from "./components/BasketPage";
import { CartProvider } from "./components/BasketContext";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <NavbarProvider>
        <CartProvider>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/airphone" element={<AirPhone />} />
              <Route path="/airtab" element={<AirTab />} />
              <Route path="/airglass" element={<AirGlass />} />
              <Route path="/basket" element={<BasketPage />} />
            </Routes>
          </div>
        </CartProvider>
      </NavbarProvider>
    </Router>
  );
}

export default App;