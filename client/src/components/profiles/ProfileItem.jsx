import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: { _id, name },
        status,
        location,
        languages
    }
}) => {
    return (
        <div className="profile">

            <div>
                <h3>{name}</h3>
                <h5>{status}</h5>
                <h5>{location}</h5>
                <h5>{languages}</h5>
                <Link to={`/profile/${_id}`} className="btn">
                    View
                </Link>
            </div>
            <ul>
                {languages.slice(0, 4).map((language, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {language}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem; 