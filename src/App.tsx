//It would be great to have animations when navigating between views TODO-future
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "./NavbarContext";
import AirPhone from "./components/AirPhone";
import AirTab from "./components/AirTab";
import AirGlass from "./components/AirGlass";
import LandingPage from "./components/LandingPage";
import CartPage from "./components/CartPage";
import { CartProvider } from "./components/CartContext";
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
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </CartProvider>
      </NavbarProvider>
    </Router>
  );
}

export default App;