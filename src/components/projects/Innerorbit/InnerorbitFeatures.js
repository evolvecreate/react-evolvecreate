import React from 'react';
import { connect } from 'react-redux';
import { removeFeatures } from '../../../store/actions/projectActions';
import CancelButton from '../../widgets/CancelButton';


const InnerorbitFeatures = (props) => {

    const { activeFeature } = props;

    const isActiveFeatures = () => {

        return activeFeature === 'innerorbit' ? 'active' : '';
    }

    const hideFeatures = (e) => {
        props.removeFeatures();
    }

    return (

        <div className={ 'panel_innerorbit panel_features from-right ' + isActiveFeatures() }>
            <CancelButton handleClick={hideFeatures} />
            <h1>Here are Innerorbit Features</h1>

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



export default connect(mapStateToProps, mapDispatchToProps)(InnerorbitFeatures);

