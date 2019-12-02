import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href="/">Logout</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/'>Devs</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    );

    return (
        <div>
            <nav className="navbar bg-sunset">
                <h1>
                    <Link to='/'>DE<span className="nav-heart">♥</span></Link>
                </h1>
                {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}

            </nav >
        </div >
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);