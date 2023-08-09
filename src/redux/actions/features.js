import {
    DRAWER_PROPS_CHANGED,
    EDIT_FIELD_LIST,
    FIELD_URL,
    GET_FEATURE_DETAILS_BY_ID,
    IS_FETCHING,
    NEW_FEATURE_MODAL_PROPS_CHANGED,
    RESET_FUTURE_MODAL_PROPS,
    SET_EXECUTED_ENDPOINTS,
    SET_REQUEST_PAYLOAD,
    SET_SWITCH_TOGGLE,
} from '../type';
import { firebaseMethod } from '../../services/firebase';

export const setNewFeaturesModalProps = payload => {
    return {
        type: NEW_FEATURE_MODAL_PROPS_CHANGED,
        payload,
    };
};

export const getFeaturesList = () => async dispatch => {
    await firebaseMethod.getFeature(dispatch);
};

export const getFeaturesListById = id => async dispatch => {
    await firebaseMethod.getFeatureById(id, dispatch);
};

export const getFeatureDetailsList = id => async dispatch => {
    try {
        dispatch(isFetchingChange(true));

        const response = await firebaseMethod.getFeatureDetailsById(id);
        if (response) {
            dispatch({
                type: GET_FEATURE_DETAILS_BY_ID,
                payload: response,
            });
        }else{
            dispatch({
                type: GET_FEATURE_DETAILS_BY_ID,
                payload: null,
            });
        }

        dispatch(isFetchingChange(false));

    } catch (error) {
        console.error(error);
    }
};

export const clearFeatureProps = () => ({
    type: RESET_FUTURE_MODAL_PROPS,
});

export const setDrawerProps = payload => {
    return {
        type: DRAWER_PROPS_CHANGED,
        payload,
    };
};

export const changeFieldsList = payload => {
    return {
        type: EDIT_FIELD_LIST,
        payload,
    };
};

export const setFieldUrl = payload => {
    return {
        type: FIELD_URL,
        payload,
    };
};
export const isFetchingChange = payload => {
    return {
        type: IS_FETCHING,
        payload,
    };
};

export const setRequestPayload = payload => {
    return {
        type: SET_REQUEST_PAYLOAD,
        payload,
    };
};
export const setSwitchToggle = payload => {
    return {
        type: SET_SWITCH_TOGGLE,
        payload,
    };
};
export const setExecutedEndpoints = payload => {
    return {
        type: SET_EXECUTED_ENDPOINTS,
        payload,
    };
};
