import {
    DRAWER_PROPS_CHANGED,
    EDIT_FIELD_LIST,
    FIELD_URL,
    GET_FEATURES_LIST,
    GET_FEATURE_BY_ID,
    GET_FEATURE_DETAILS_BY_ID,
    IS_FETCHING,
    NEW_FEATURE_MODAL_PROPS_CHANGED,
    RESET_FUTURE_MODAL_PROPS,
    SET_EXECUTED_ENDPOINTS,
    SET_REQUEST_PAYLOAD,
    SET_SWITCH_TOGGLE,
} from '../type';

const resetFutureModalProps = {
    isVisible: false,
    type: '',
    setNewFeatureValue: '',
    featureId: '',
};

const initialState = {
    isFetching: false,
    newFeatureModalProps: resetFutureModalProps,
    featureList: [],
    featureListById: null,
    drawerProps: { isVisible: false, submitBtn: false },
    featureDetailsList: null,
    editFieldList: null,
    fieldUrl: {},
    requestPayload: false,
    switchToggle: 'tree',
    executedEndpoints: [],
};

const featureNewModal = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case NEW_FEATURE_MODAL_PROPS_CHANGED: {
            return {
                ...state,
                newFeatureModalProps: {
                    ...state.newFeatureModalProps,
                    ...payload,
                },
            };
        }
        case GET_FEATURES_LIST: {
            return {
                ...state,
                featureList: payload,
            };
        }
        case GET_FEATURE_BY_ID: {
            return {
                ...state,
                featureListById: payload,
            };
        }
        case GET_FEATURE_DETAILS_BY_ID: {
            return {
                ...state,
                featureDetailsList: payload,
            };
        }
        case RESET_FUTURE_MODAL_PROPS: {
            return {
                ...state,
                newFeatureModalProps: resetFutureModalProps,
            };
        }
        case EDIT_FIELD_LIST: {
            return {
                ...state,
                editFieldList: payload,
            };
        }
        case SET_EXECUTED_ENDPOINTS: {
            return {
                ...state,
                executedEndpoints: payload,
            };
        }
        case FIELD_URL: {
            return {
                ...state,
                fieldUrl: { ...state.fieldUrl, ...payload },
            };
        }
    
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: payload,
            };
        }
        case SET_SWITCH_TOGGLE: {
            return {
                ...state,
                switchToggle: payload,
            };
        }
        case SET_REQUEST_PAYLOAD: {
            return {
                ...state,
                requestPayload: payload,
            };
        }
        case DRAWER_PROPS_CHANGED: {
            return {
                ...state,
                drawerProps: {
                    ...state.drawerProps,
                    ...payload,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default featureNewModal;
