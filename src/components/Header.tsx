import React from 'react';
import {Link} from 'react-router-dom';
function Header(){
    return(
        <div className="ui menu">
            <div className="header item">
                Incedo
            </div>
            <Link className="item" to="/home">
                Home
            </Link>
            <Link className="item" to="/about-us">
                About Us
            </Link>
            <Link className="item" to="/login">
                Login
            </Link>
        </div>
    );
}

export default Header;