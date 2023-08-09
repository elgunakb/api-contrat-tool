import { get, ref, remove, set, update } from 'firebase/database';
import { db } from '../Config/firebase';
import { GET_FEATURES_LIST, GET_FEATURE_BY_ID } from '../redux/type';
import { notification } from './notification';
import { getFeatureDetailsList, isFetchingChange } from '../redux/actions/features';

export const updateFeature = ({ featureId, setNewFeatureValue }) => {
    update(ref(db, `/features/${featureId}`), {
        id: featureId,
        name: setNewFeatureValue,
    });
};

export class firebaseMethod {
    static updateFeatureName(featureId, setNewFeatureValue) {
        update(ref(db, `/features/${featureId}`), {
            id: featureId,
            name: setNewFeatureValue,
        });
        notification.success('Feature name is updated!');
    }

    static updateFeatureStatus(featureId, status) {
        update(ref(db, `/features/${featureId}`), {
            status,
        });
    }

    static deleteFeature(featureId) {
        remove(ref(db, `/features/${featureId}`));
        notification.success(`Feature is deleted`);
    }

    static async getFeature(dispatch) {
        dispatch(isFetchingChange(true));
        try {
            const snapshot = await get(ref(db));
            const data = snapshot.val();
            let list = [];

            if (data !== null) {
                Object.values(data.features)?.forEach(feature => {
                    list.push(feature);
                });
            }

            dispatch({
                type: GET_FEATURES_LIST,
                payload: list,
            });
            dispatch(isFetchingChange(false));
        } catch (error) {
            console.log(error.message);
            notification.success(`${error.message}`);
        }
    }

    static async getFeatureById(featureId, dispatch) {
        try {
            const snapshot = await get(ref(db, `/features/${featureId}`));
            const data = snapshot.val();

            if (data !== null) {
                const list = {
                    id: featureId,
                    ...data,
                };

                dispatch({
                    type: GET_FEATURE_BY_ID,
                    payload: list,
                });
            } else {
                // console.log(`Feature with ID ${featureId} not found.`);
                notification.success(`Feature with ID ${featureId} not found.`);
            }
        } catch (error) {
            // console.log(error.message);
            notification.success(`${error.message}`);
        }
    }

    // static async getFeatureByStatus(status) {
    //     try {
    //         const snapshot = await get(ref(db, '/features'));
    //         const data = snapshot.val();
    //         let filteredList = [];

    //         if (data !== null) {
    //             Object.entries(data).forEach(([featureId, featureData]) => {
    //                 if (featureData.status === status) {
    //                     const feature = {
    //                         id: featureId,
    //                         ...featureData,
    //                     };
    //                     console.log(feature);
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //         notification.success(`${error.message}`);
    //     }
    // }
    static setNewFeatureDetails(data, id, dispatch) {
        const currentDate = new Date();
        const detailsId = currentDate.getTime().toString();
        if (data) {
            if (data.method !== get) {
                const featureDetailsRef = ref(db, `featureDetails/${id}/endpoints`);
                update(featureDetailsRef, {
                    [detailsId]: {
                        id: detailsId,
                        app: data.app,
                        description: data.description,
                        requestParams: data.requestParams,
                        requestPayload: data.requestPayload,
                        responseFields: data.responseFields,
                        method: data.method,
                        url: data.url,
                    },
                });
            } else {
                const featureDetailsRef = ref(db, `featureDetails/${id}/endpoints`);
                update(featureDetailsRef, {
                    [detailsId]: {
                        id: detailsId,
                        app: data.app,
                        description: data.description,
                        requestParams: data.requestParams,
                        requestPayload: null,
                        responseFields: data.responseFields,
                        method: data.method,
                        url: data.url,
                    },
                });
            }
            notification.success('Feature is created');
            dispatch(getFeatureDetailsList(id));
        } else {
            notification.error('Invalid data');
        }
    }

    static async getFeatureDetailsById(featureId) {
        const snapshot = await get(ref(db, `/featureDetails/${featureId}`));
        const data = snapshot.val();
        if (data !== null) {
            const groupedEndpoints = {};

            Object.values(data.endpoints).forEach(endpoint => {
                const app = endpoint.app;
                if (groupedEndpoints[app]) {
                    groupedEndpoints[app].push(endpoint);
                } else {
                    groupedEndpoints[app] = [endpoint];
                }
            });

            return groupedEndpoints;
        }
    }

    static updateFeatureDetails(dispatch, featureId, editFieldList, data) {
        const { requestPayload, ...otherFields } = data;

        const featureDetailsRef = ref(db, `featureDetails/${featureId}/endpoints`);
        if (data && editFieldList && featureId) {
            if (data.method !== 'get') {
                update(featureDetailsRef, {
                    [editFieldList.id]: {
                        id: editFieldList.id,
                        ...data,
                    },
                });
            } else {
                update(featureDetailsRef, {
                    [editFieldList.id]: {
                        ...otherFields,
                        id: editFieldList.id,
                    },
                });
            }
            notification.success('Feature is updated');
            dispatch(getFeatureDetailsList(featureId));
        } else {
            notification.error('Invalid data');
        }
    }

    static deleteFeatureMethod(featureId, detailsId, dispatch) {
        remove(ref(db, `featureDetails/${featureId}/endpoints/${detailsId}`));
        dispatch(getFeatureDetailsList(featureId));
        notification.success('Field method is deleted!');
    }
}
