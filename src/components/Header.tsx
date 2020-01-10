import React from 'react';
import {Link} from 'react-router-dom';
function Header(){
    return(
        <React.Fragment>
        {/* Header  Starts*/}
            <div className="header">
                <h1>Assignment One</h1>
                <p>With a <b>flexible</b> layout.</p>
            </div>
        {/* Header  Ends*/}
        {/* Navbar Starts*/}
        <div className="navbar">
            
            <Link className="nav_menu" to="/home">
                Home
            </Link>
            <Link className="nav_menu" to="/about-us">
                About Us
            </Link>
            <Link className="nav_menu" to="/login">
                Login
            </Link>
            <Link className="nav_menu" to="/autocomplete">
                Autocomplete
            </Link>
        </div>
        {/* Navbar Ends */}
        </React.Fragment>
    );
}

export default Header;