import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Looking = ({ looking }) => {
    const lookings = looking.map(look => (
        <ul className="dashlook-content" key={look._id} >
            <li>Relationship Type: {look.interested}</li>
            <li>Gender: {look.gender}</li>
            <li>Min-Height: {look.minheight}</li>
            <li>Max-Height: {look.maxheight}</li>
            <li>Min-Weight: {look.minweight}</li>
            <li>Max-Weight: {look.maxweight}</li>
            <li>Min-Age: {look.minage}</li>
            <li>Max-Age: {look.maxage}</li>
            <li>Physique: {look.physique}</li>
            <li>How Far: {look.distance}</li>
            <li>I Hate....: {look.hate}</li>
            <li>Children or No: {look.children}</li>
            <li>
                <button className="btn btn-danger">Delete</button>
            </li>
        </ul>
    ));

    return (
        <>
            <h2 className="my-2">Looking for</h2>
            <div className="dashlook-container">
                <h2 className="dashlook-header">
                    I'm interested in ...
                </h2>
                <div>{lookings}</div>
            </div>
        </>
    );
};

Looking.propTypes = {
    looking: PropTypes.array.isRequired,

};

export default Looking;