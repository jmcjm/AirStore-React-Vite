//It would be great to have animations when navigating between views TODO-future
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "./NavbarContext";
import DefaultProductPage from "./components/DefaultProductPage";
import AirGlass from "./components/AirGlass";
import LandingPage from "./components/LandingPageNew";
import CartPageNew from "./components/CartPageNew";
import { CartProvider } from "./components/CartContext";
import NavBar from "./components/NavBarNew";

const App: React.FC = () => {
  return (
    <Router>
      <NavbarProvider>
        <CartProvider>
          <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/airphone" element={<DefaultProductPage productType={1} />} />
              <Route path="/airtab" element={<DefaultProductPage productType={2} />} />
              <Route path="/airglass" element={<AirGlass />} />
              <Route path="/cart" element={<CartPageNew />} />
            </Routes>
        </CartProvider>
      </NavbarProvider>
    </Router>
  );
}

export default App;