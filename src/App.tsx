import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarProvider } from './NavbarContext';
import AirPhone from './components/AirPhone';
import AirTab from './components/AirTab';
import AirGlass from './components/AirGlass';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavbarProvider>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/airphone" element={<AirPhone />} />
            <Route path="/airtab" element={<AirTab />} />
            <Route path="/airglass" element={<AirGlass />} />
          </Routes>
        </div>
      </NavbarProvider>
    </Router>
  );
}

export default App;
