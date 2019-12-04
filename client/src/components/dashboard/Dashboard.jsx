import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Loading />
    ) : (
            <>
                <h1 className="large">Dashboard</h1>
                <p className="lead">
                    Hey There {user && user.name}!
            </p>
                {profile !== null ? (
                    <>has</>
                ) : (
                        <>
                            <p>
                                Uh Oh! No Profile! Fear not, fill out the profile page and you'll be smoochin' in no time.
                </p>
                            <Link to='/create-profile' className='btn btn-primary'>
                                Set Up Profile
            </Link>
                        </>
                    )}

            </>
        );
};





Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);