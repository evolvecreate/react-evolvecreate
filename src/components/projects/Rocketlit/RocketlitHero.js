import React from 'react';
import { connect } from 'react-redux';
import { updateFeatures } from '../../../store/actions/projectActions';

const RocketlitHero = (props) => {

    const showFeatures = (e) => {
        e.preventDefault();
        props.updateFeatures('rocketlit');
    }

    return (

        <div className="panel_hero">
            <div className="content-width">
                <img className="logo_rocketlit"  src={props.logo} height="150" alt="RocketLit Logo" />
                <h1>Science and History tailored to each student's reading level</h1>
                <a target="_blank" href={props.url} rel="noopener noreferrer" onClick={showFeatures}>
                    <button type="button" className="button3 cta">Experience RocketLit</button>
                </a>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {

    return {
        updateFeatures: (name)  => { dispatch(updateFeatures(name))}
    }
}


export default connect(null, mapDispatchToProps)(RocketlitHero);
