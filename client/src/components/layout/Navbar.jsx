import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar bg-sunset">
                <h1>
                    <Link to='/'>DE<span className="nav-heart">♥</span></Link>
                </h1>
                <ul>
                    <li><Link to='/'>Devs</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav >
        </div >
    )
}

export default Navbar;