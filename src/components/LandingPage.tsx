import React, { useContext } from 'react';
import { NavbarContext } from '../NavbarContext';
import '../index.css';

function LandingPage() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  return (
    <div className="container-fluid bg-image text-light" style={{backgroundImage: `url('https://rybka.ct8.pl/1/012.jpg')`, height: availableHeight - 1 }}>
      <div className='container-fluid text-light d-flex flex-column align-items-center justify-content-center' style={{ height: '50%' }}>
        <p className='header-text'>AIRGLASS</p>
        <div>
          <button type="button" className="btn btn-outline-light">Buy now</button>
        </div>
      </div>
      <div className='container-fluid text-light d-flex flex-column align-items-center justify-content-center bg-color' style={{backgroundColor: `rgba(0,0,0,0.5)`, height: '45%' }}>
        empty
      </div>
    </div>
  );  
}

export default LandingPage;
