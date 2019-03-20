import React from 'react';
import { connect } from 'react-redux';
import { removeFeatures } from '../../../store/actions/projectActions';
import CancelButton from '../../widgets/CancelButton.js';
import Annotations from './Features/Annotations';

const RocketlitFeatures = (props) => {

    const { activeFeature } = props;

    const isActiveFeatures = () => {

        return activeFeature === 'rocketlit' ? 'active' : '';
    }

    const hideFeatures = (e) => {
        props.removeFeatures();
    }

    return (

        <div className={ 'panel_rocketlit_features panel_features from-right ' + isActiveFeatures() }>
            <CancelButton handleClick={hideFeatures} />
            <Annotations />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        activeFeature: state.projects.features
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFeatures: () => { dispatch(removeFeatures()) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RocketlitFeatures);

