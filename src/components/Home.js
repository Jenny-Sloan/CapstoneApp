import React from 'react';
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="App">
      <nav class="navbar navbar-dark bg-dark">
        <h1> HOME </h1>
        <Link to="/puppy">DOGS</Link>
        <Link to="/form">FORM</Link>
      </nav>
      <h1>Welcome to the Dog Club</h1>

      <br />

      <img src="https://static.wixstatic.com/media/fbf034_8fb65773f5c14f97badadf08cd175c5b~mv2_d_4967_2490_s_4_2.jpg/v1/fill/w_1024,h_1024,al_c,q_85,usm_0.66_1.00_0.01/fbf034_8fb65773f5c14f97badadf08cd175c5b~mv2_d_4967_2490_s_4_2.webp" alt="Dogs" height="500" width="600" />

    </div>
  );
}

export default Home;