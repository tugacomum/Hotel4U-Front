import React from "react";
import { Link } from "react-router-dom";

function Landingcreen() {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-8 my-auto text-center" style={{ borderRight: '8px solid white', bottom: '5rem' }}>
        <h2 style={{ color: 'white', fontSize: '130px' }}>Hotel4U</h2>
        <h1 style={{ color: 'white' }}>"There is only one boss. The Guest."</h1>
        <Link to="/hotels">
            <button className="btn landingbtn" style={{ color: 'black' }}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingcreen;
