import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    })

    return (
        <div>


        </div>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile