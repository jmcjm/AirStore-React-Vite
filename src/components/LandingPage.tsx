import React, { useContext } from 'react';
import { NavbarContext } from '../NavbarContext';
import LandingPageProductList from './ApiConn';
import '../index.css';

function LandingPage() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  return (
    <div className="bg-image text-light" style={{backgroundImage: `url('https://rybka.ct8.pl/1/012.jpg')`, height: `calc(100vh - ${navbarHeight}px - 1px)`, position: 'fixed', width: '100%', overflowY: 'auto' }}>
      <div className='container-fluid text-light d-flex flex-column align-items-center justify-content-center main-banner'>
        <p className='header-text'>AIRGLASS</p>
        <div>
          <button type="button" className="btn btn-outline-light">Buy now</button>
        </div>
      </div>
      <div className='container-md flex-wrap rounded text-light d-flex align-items-center justify-content-around ads-banner'>
        <LandingPageProductList />
      </div>
    </div>
  );  
}

export default LandingPage;
