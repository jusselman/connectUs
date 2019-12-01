import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Success');


    };


    return (
        <div>
            <section className="container-register">
                <div className="container register-container-form">
                    <h1 className="large text-primary">Welcome Back DE<span className="register-heart">♥</span></h1>
                    <p className="lead"><i className="fas fa-user"></i></p>
                    <form className="form" onSubmit={e => onSubmit(e)}>
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
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                        Not a DE♥er? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Login;