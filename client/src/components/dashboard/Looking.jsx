import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Looking = ({ looking }) => {
    const lookings = looking.map(look => (
        <tr key={look._id}>
            <td>{look.interested}</td>
            <td>{look.age}</td>
            <td>{look.gender}</td>
            <td>{look.minheight}</td>
            <td>{look.maxheight}</td>
            <td>{look.minweight}</td>
            <td>{look.maxweight}</td>
            <td>{look.minage}</td>
            <td>{look.maxage}</td>
            <td>{look.physique}</td>
            <td>{look.distance}</td>
            <td>{look.hate}</td>
            <td>{look.children}</td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <>
            <h2 className="my-2">Looking for</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Interested in</th>
                    </tr>
                </thead>
                <tbody>{lookings}</tbody>
            </table>

        </>
    );
};

Looking.propTypes = {
    looking: PropTypes.array.isRequired,

};

export default Looking;