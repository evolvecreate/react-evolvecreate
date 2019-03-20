import { UPDATE_FEATURES, REMOVE_FEATURES } from '../actions/actionTypes'

const initState = {
    projects: [
        {id: 1, title: 'yo'},
        {id: 2, title: 'yo2'}
    ],
    features: null
};


const projectReducer = (state = initState, action) => {

    if (action.type === UPDATE_FEATURES) {
        return {
            ...state,
            features: action.name
        };
    }

    if (action.type === REMOVE_FEATURES) {
        return {
            ...state,
            features: null
        }
    }

    return state;
}

export default projectReducer

