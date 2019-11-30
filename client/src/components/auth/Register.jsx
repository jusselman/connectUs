import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {
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
            console.log('Password does not match')
        } else {
            const newUser = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config);
                console.log(res.data);

            } catch (err) {
                console.error(err.response.data)
            }
        }
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
                            {/* <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                        > */}
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
                        Already a DE♥er? <a href="login.html">Sign In</a>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Register;