import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';



const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    });

    const { name, email, password, passwordConf } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== passwordConf) {
            setAlert('Password Does not Match', 'danger')
        } else {
            register({ name, email, password });

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <section className="container-register">
                <div className="container register-container-form">
                    <h1 className="large text-primary">Start DE<span className="register-heart">♥</span>ing</h1>
                    <p className="lead"><i className="fas fa-user"></i></p>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />

                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="passwordConf"
                                minLength="6"
                                value={passwordConf}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Already a DE♥er? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </section>
        </div>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);