export const setRequestFields = ({ value, setRequestForm }) => {
    const processFields = fields => {
        if (!fields) {
            return {};
        }

        return fields.reduce((result, item) => {
            const { key, defaultValue, jsonFields, type } = item;

            if (type === 'object' && jsonFields) {
                result[key] = processFields(jsonFields);
            } else {
                result[key] = defaultValue;
            }

            return result;
        }, {});
    };

    const formData = processFields(value.requestParams);
    setRequestForm(formData);
};
export const setRequestPayload = ({ value, setRequestPayloadState }) => {
    const processFields = fields => {
        if (!fields) {
            return {};
        }

        return fields.reduce((result, item) => {
            const { key, defaultValue, jsonFields, type } = item;

            if (type === 'object' && jsonFields) {
                result[key] = processFields(jsonFields);
            } else {
                result[key] = defaultValue;
            }

            return result;
        }, {});
    };

    const formData = processFields(value.requestPayload);
    setRequestPayloadState(formData);
};

export const convertData = (inputData, name) => {
    const result = {};
    if (inputData) {
        if (name == 'responseFields') {
            inputData.map(field => {
                if (field.key) {
                    if (field.type === 'boolean') {
                        result[field.key] = field.type;
                    } else if (field.type === 'array') {
                        result[field.key] = [convertData(field.jsonFields)];
                    } else if (field.type === 'object') {
                        result[field.key] = convertData(field.jsonFields);
                    } else {
                        result[field.key] = field.type;
                    }
                }
            });
            return result;
        } else {
            inputData.map(field => {
                if (field.key) {
                    if (field.type === 'boolean') {
                        result[field.key] = field.defaultValue === 'true';
                    } else if (field.type === 'array') {
                        result[field.key] = [convertData(field.jsonFields)];
                    } else if (field.type === 'object') {
                        result[field.key] = convertData(field.jsonFields);
                    } else {
                        result[field.key] = field.type;
                    }
                }
            });
            return result;
        }
    }
};


