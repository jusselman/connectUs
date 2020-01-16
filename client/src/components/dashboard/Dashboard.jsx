import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';
import Looking from './Looking';

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
                <div className="dashboard-container">
                    <div className="dashboard-text">
                        <h1>Dashboard</h1>
                        <p>
                            Hey There {user && user.name}!
                        </p>
                        {profile !== null ? (
                            <>
                                <DashboardActions />
                                <Looking looking={profile.looking} />
                            </>
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
                    </div>
                </div>
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