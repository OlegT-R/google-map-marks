import React from 'react';
import PropTypes from 'prop-types';
import './flex-container.scss';

const flexContainer = ({leftArea, rightArea}) => {
    return (
        <div className="flex-container">
            <div className="left-area">{leftArea}</div>
            <div className="right-area">{rightArea}</div>
            <div className="clearfix" />
        </div>
    )
};

flexContainer.propTypes = {
  leftArea: PropTypes.object.isRequired,
  rightArea: PropTypes.object.isRequired,
};

export default flexContainer;