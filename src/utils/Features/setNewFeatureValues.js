import { ref, set } from 'firebase/database';
import { db } from '../../Config/firebase';
import { clearFeatureProps, getFeaturesList, setNewFeaturesModalProps } from '../../redux/actions/features';
import { notification } from '../../services/notification';

export const setNewFeatureValues = ({ store, dispatch, setNewFeatureValue }) => {
    const currentDate = new Date();
    const id = currentDate.getTime().toString();

    if (setNewFeatureValue) {
        set(ref(db, `features/${id}`), {
            id,
            name: setNewFeatureValue,
            status: 'active',
        });
        dispatch(setNewFeaturesModalProps({ isVisible: false }));
        dispatch(getFeaturesList());
        dispatch(clearFeatureProps());
        notification.success('Feature is created');
    } else {
        notification.error('Please fill the blank');
    }
};
