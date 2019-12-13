import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        gender: '',
        location: '',
        company: '',
        website: '',
        languages: '',
        githubusername: '',
        hobbies: '',
        profession: '',
        instagram: '',
        snapchat: '',
        facebook: '',
        linkedin: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        age,
        height,
        gender,
        company,
        website,
        languages,
        githubusername,
        location,
        status,
        hobbies,
        profession,
        instagram,
        snapchat,
        facebook,
        linkedin
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }
    return (
        <>
            <div className="profile-signup-container">
                <h1 className="large text-primary">
                    What kind of DE♥ are you?
            </h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Make that profile sing!
            </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <div className="profile-text">
                            Tell us about you, DE♥
                            </div>
                        <select name="status" value={status} onChange={e => onChange(e)}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Front End">Front End</option>
                            <option value="Back End">Back End</option>
                            <option value="Full Stack">Full Stack</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Intern/Associate">Intern/Associate</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <div className="profile-text">
                            Tell us about your work-life</div>
                    </div>
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />

                    <div className="form-group">
                        <div className="profile-text">Personal or Professional</div>

                        <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <div className="profile-text">
                            Where are you?
                    </div>
                        <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />

                        <div className="form-group">
                            <div className="profile-text">
                                What languages do you use?
                        </div>
                            <input type="text" placeholder="Languages" name="languages" value={languages} onChange={e => onChange(e)} />

                        </div>
                        <div className="form-group">
                            <div className="profile-text">
                                Github username
                        </div>
                            <input
                                type="text"
                                placeholder="Github Username"
                                name="githubusername"
                                value={githubusername} onChange={e => onChange(e)}
                            />

                        </div>
                        <div className="form-group">
                            <div className="profile-text">Tell the other DE♥s about you</div>
                            <textarea placeholder="DE♥ Bio" name="bio"></textarea>

                        </div>

                        <div className="my-2">
                            <button onClick={() => toggleSocialInputs(!displaySocialInputs)}

                                type="button" className="btn btn-light">
                                Social Media
                    </button>

                        </div>

                        {displaySocialInputs && <>
                            <div className="form-group">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input type="text" placeholder="Facebook URL" name="facebook" />
                            </div>

                            <div className="form-group">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input type="text" placeholder="YouTube URL" name="youtube" />
                            </div>

                            <div className="form-group">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input type="text" placeholder="Linkedin URL" name="linkedin" />
                            </div>

                            <div className="form-group">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="Instagram URL" name="instagram" />
                            </div>
                        </>}


                        <input type="submit" className="btn btn-primary my-1" />
                        <div className="btn btn-light"><Link to="/dashboard">Dashboard</Link></div>


                    </div>
                </form>
            </div>
        </>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile));