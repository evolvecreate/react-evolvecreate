import React from 'react';
import { connect } from 'react-redux';
import { updateFeatures } from '../../../store/actions/projectActions';

const InnerorbitHero = (props) => {

    const showFeatures = (e) => {
        e.preventDefault();
        props.updateFeatures('innerorbit');
    }

    return (

        <div className="panel_hero">
            <div className="textGradient">
                <div className="content-width">
                    <div className="panel_heading">
                        <div className="panel_left">
                            <img className="logo_innerorbit" src={props.logo} alt="Inner Orbit Logo" />
                        </div>
                        <div className="panel_right">
                            <h1 className="text-shadow"><span>Inner</span>Orbit</h1>
                            <h2>NGSS Formative Assessments</h2>
                            <a target="_blank" href={props.url} rel="noopener noreferrer" onClick={showFeatures}>
                                <button type="button" className="button3 cta">Experience InnerOrbit</button>
                            </a>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {

    return {
        updateFeatures: (name)  => { dispatch(updateFeatures(name))}
    }
}


export default connect(null, mapDispatchToProps)(InnerorbitHero);
