import React, { useContext } from 'react';
import { NavbarContext } from '../NavbarContext';
import LandingPageProductList from './ApiConn';
import '../index.css';

function LandingPage() {
  const { navbarHeight, availableHeight } = useContext(NavbarContext);

  return (
    <div className="bg-image text-light" style={{backgroundImage: `url('https://www.roadtovr.com/wp-content/uploads/2021/05/spectacles-ar-glasses-2.jpg')`, height: `calc(100vh - ${navbarHeight}px - 1px)`, position: 'fixed', width: '100%', overflowY: 'auto', backgroundSize: 'cover' }}>
      <div className='container-fluid text-light d-flex flex-column align-items-center justify-content-center main-banner'>
        <p className='header-text'>AIRGLASS</p>
        <div>
          <button type="button" className="btn btn-outline-light">Buy now</button>
        </div>
      </div>
      <LandingPageProductList />
    </div>
  );  
}

export default LandingPage;
