import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLooking } from '../../actions/profile';


const AddLooking = ({ addLooking, history }) => {
    const [formData, setFormData] = useState({
        interested: '',
        gender: '',
        minheight: '',
        maxheight: '',
        minweight: '',
        maxweight: '',
        minage: '',
        maxage: '',
        physique: '',
        distance: '',
        hate: '',
        children: ''
    });

    const {
        interested,
        gender,
        minheight,
        maxheight,
        minweight,
        maxweight,
        minage,
        maxage,
        physique,
        distance,
        hate,
        children
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <div className="looking-container">
                <h1 className="looking-header">
                    What are you looking for?
                </h1>
                <p className="lead">
                    Tell us what the DE♥ of your dreams would be like...
                </p>
                <form className="form" onSubmit={e => {
                    e.preventDefault();
                    addLooking(formData, history);
                }}>
                    <div className="form-group">
                        <input type="text" placeholder="Interested In" name="interested" value={interested} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Gender" name="gender" value={gender} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Min-Age" name="minage" value={minage} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Max-Age" name="maxage" value={maxage} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Min-Weight" name="minweight" value={minweight} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Max-Weight" name="maxweight" value={maxweight} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Min-Height" name="minheight" value={minheight} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Max-Height" name="maxheight" value={maxheight} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Physique" name="physique" value={physique} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Max Distance" name="distance" value={distance} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <h4 className="looking-children">What's something you hate?</h4>
                        <input type="text" placeholder="Hate?" name="hate" value={hate} onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <h4 className="looking-children">Do you prefer someone with or w/o children?</h4>
                        <input type="text" placeholder="Children?" name="children" value={children} onChange={e => onChange(e)} required />
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
                </form>
            </div>
        </>
    )
}

AddLooking.propTypes = {
    addLooking: PropTypes.func.isRequired
};

export default connect(null, { addLooking })(withRouter(AddLooking));