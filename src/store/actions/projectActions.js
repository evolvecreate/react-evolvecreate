import { UPDATE_FEATURES, REMOVE_FEATURES } from './actionTypes'


export const updateFeatures = (name) => {
    return {
        type: UPDATE_FEATURES,
        name
    }
};


export const removeFeatures = () => {
    return {
        type: REMOVE_FEATURES
    }
};