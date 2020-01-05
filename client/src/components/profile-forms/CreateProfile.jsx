import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const CreateProfile = ({
    createProfile,
    getCurrentProfile,
    profile: { profile, loading },
    history
}) => {
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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
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
                                Relationship Status
                            </div>
                            <input type="text" placeholder="Relationship Status" name="status" value={status} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group">
                            <div className="profile-text">
                                Age
                            </div>
                            <input type="text" placeholder="Age" name="age" value={age} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group">
                            <div className="profile-text">
                                Height
                        </div>
                            <input type="text" placeholder="Height" name="height" value={height} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group">
                            <div className="profile-text">
                                Gender
                        </div>
                            <input type="text" placeholder="Gender" name="gender" value={gender} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group">
                            <div className="profile-text">
                                Hobbies
                        </div>
                            <input type="text" placeholder="Hobbies" name="hobbies" value={hobbies} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group">
                            <div className="profile-text">
                                Profession
                        </div>
                            <input type="text" placeholder="Profesion" name="profession" value={profession} onChange={e => onChange(e)} />
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
                                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="SnapChat URL" name="snapchat" value={snapchat} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                                </div>
                            </>}


                            <input type="submit" className="btn btn-primary my-1" />
                            <Link className='btn btn-light my-1' to='/dashboard'>
                                Back
                            </Link>


                        </div>
                    </form>
                </div>
            </>
        );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));