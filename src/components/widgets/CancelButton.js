import React from 'react';

const CancelButton = (props) => {
    return (
        <div className="cancel-button" onClick={props.handleClick}></div>
    )
}

export default CancelButton;