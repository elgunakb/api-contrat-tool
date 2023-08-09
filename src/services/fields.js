import { changeFieldsList, setDrawerProps } from "../redux/actions/features";

export class fieldsMethod {
    static resetFields(setValue, dispatch) {
        setValue('requestParams', [{ key: '', type: '', defaultValue: '' }]);
        setValue('responseFields', [{ key: '', type: '', defaultValue: '' }]);
        setValue('app', '');
        setValue('url', '');
        setValue('description', '');
        setValue('method', '');
        setValue(`requestPayload`, null);
        dispatch(setDrawerProps({ isVisible: false, submitBtn: null }));
        dispatch(changeFieldsList(''));
    }
}
