import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                    <>
                        <h1 className="large">DE♥s</h1>
                        <p> See Developers </p>
                        <div className="profiles">
                            {profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : (
                                    <h3>None found</h3>
                                )}
                        </div>
                    </>
                )}
        </>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, { getProfiles })(Profiles);