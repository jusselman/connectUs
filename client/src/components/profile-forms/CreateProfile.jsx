import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = props => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        gender: '',
        location: '',
        hobbies: '',
        profession: '',
        instagram: '',
        snapchat: '',
        facebook: '',
        linkedin: ''
    });

    const {
        age,
        height,
        gender,
        location,
        hobbies,
        profession,
        instagram,
        snapchat,
        facebook,
        linkedin
    } = formData;

    return (
        <>

            <h1 className="large text-primary">
                What kind of DE♥ are you?
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Make that profile sing!
            </p>
            <div>* = required field</div>
            <form className="form">
                <div className="form-group">
                    <select name="status">
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="form-text">
                        Tell us about your DE♥</div>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" />
                    <div className="form-text">
                        Tell them about your work-life</div>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" />
                    <div className="form-text">Could be your own or a company website</div>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" />
                    <div className="form-text">
                        Where are you?
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" />
                        <div className="form-text">
                            What languages do you speak?
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                        />
                        <div className="form-text">
                            Github username</div>
                    </div>
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio"></textarea>
                        <div className="form-text">Tell the other DE♥s about you</div>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light">
                            Social Media Links
                    </button>
                        <span>Optional</span>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" />
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <a className="btn btn-light my-1" href="dashboard.html">Dashboard</a>

                </div>
            </form>
        </>
    )
}

export default CreateProfile;