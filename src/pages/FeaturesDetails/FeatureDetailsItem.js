import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldsList, setDrawerProps, setExecutedEndpoints, setFieldUrl } from '../../redux/actions/features';
import { Accordion, Button } from '@mantine/core';
import axios from 'axios';
import ReactCodeSinppet from 'react-code-snippet';
import style from './FeatureDetails.module.scss';
import classNames from 'classnames';
import { firebaseMethod } from '../../services/firebase';
import FieldsSections from '../../components/FieldsSections/FieldsSections';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { setRequestFields, setRequestPayload } from '../../utils/setRequestFields';

const FeatureDetailsItem = ({ endpoint }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [response, setResponse] = useState(null);
    const [requestForm, setRequestForm] = useState(null);
    const [requestPayloadState, setRequestPayloadState] = useState(null);
    const { fieldUrl, executedEndpoints } = useSelector(state => state.featureNewModal);

    const { register, control, getValues, setValue } = useForm();

    const value = useWatch({
        control,
    });

    useEffect(() => {
        setRequestFields({ value, setRequestForm });
    }, [value.requestParams]);

    useEffect(() => {
        setRequestPayload({ value, setRequestPayloadState });
    }, [value.requestPayload]);

    const handleEdit = () => {
        dispatch(changeFieldsList(endpoint));
        dispatch(setDrawerProps({ isVisible: true, submitBtn: true }));
    };

    const handleRun = () => {
        dispatch(setFieldUrl(endpoint));
        dispatch(setExecutedEndpoints([...executedEndpoints, endpoint.id]));
    };

    const handleExecute = () => {
        if (fieldUrl) {
            if (fieldUrl.method === 'get') {
                axios({
                    method: fieldUrl.method,
                    url: fieldUrl.url,
                    params: requestForm,
                })
                    .then(response => {
                        if (response.data) {
                            setResponse(JSON.stringify(response.data, null, 2));
                        } else {
                            setResponse(JSON.stringify(response, null, 2));
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.data) {
                                setResponse(JSON.stringify(error.response.data, null, 2));
                            } else {
                                setResponse(JSON.stringify(error, null, 2));
                            }
                        } else {
                            setResponse(JSON.stringify(error, null, 2));
                        }
                    });
            } else {
                axios({
                    method: fieldUrl.method,
                    url: fieldUrl.url,
                    data: requestPayloadState,
                    headers: {
                        'x-lang': 'eng',
                    },
                })
                    .then(response => {
                        setResponse(JSON.stringify(response.data, null, 2));
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.data) {
                                setResponse(JSON.stringify(error.response.data, null, 2));
                            } else {
                                setResponse(JSON.stringify(error.response, null, 2));
                            }
                        } else {
                            setResponse(JSON.stringify(error, null, 2));
                        }
                    });
            }
        }
    };

    const onDelete = endpoint => {
        firebaseMethod.deleteFeatureMethod(id, endpoint.id, dispatch);
    };

    useEffect(() => {
        if (endpoint.requestParams) {
            setValue('requestParams', endpoint.requestParams);
        }
        if (endpoint.requestPayload) {
            setValue('requestPayload', endpoint.requestPayload);
        }
        if (endpoint.responseFields) {
            setValue('responseFields', endpoint.responseFields);
        }
    }, [endpoint]);

    const onCancel = endpoint => {
        setResponse('');
        const updatedExecutedEndpoints = executedEndpoints.filter(id => id !== endpoint.id);
        dispatch(setExecutedEndpoints(updatedExecutedEndpoints));
    };

    return (
        <Accordion.Item key={endpoint.id} value={`panel-${endpoint.id}`}>
            <Accordion.Control className={classNames(style.methods, style[endpoint.method])}>
                <span className={style.accordionHeader}>
                    <label>
                        <h4>{endpoint.method.toUpperCase()}</h4>
                    </label>
                    <p>{endpoint.description}</p>
                    <p>{endpoint.url}</p>
                </span>
            </Accordion.Control>
            <Accordion.Panel style={{ justifyContent: 'space-between', display: 'block' }}>
                <div className={style.panelContent}>
                    <div>
                        <FieldsSections
                            endpoint={endpoint}
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            control={control}
                            value={value}
                        />
                        <span className={style.editButton}>
                            {!executedEndpoints.includes(endpoint.id) ? (
                                <>
                                    <Button className={style.editButtons} onClick={handleEdit} color='green'>
                                        Edit
                                    </Button>
                                    <Button onClick={() => onDelete(endpoint)} color='green'>
                                        Delete
                                    </Button>
                                </>
                            ) : null}
                        </span>
                    </div>

                    <div>
                        {endpoint.url ? (
                            executedEndpoints.includes(endpoint.id) ? (
                                <>
                                    <Button
                                        className={style.cancelButton}
                                        onClick={() => onCancel(endpoint)}
                                        color='red'
                                    >
                                        Cancel
                                    </Button>
                                    <Button className={style.executeButton} onClick={handleExecute} color='blue'>
                                        Execute
                                    </Button>
                                </>
                            ) : (
                                <Button className={style.runButton} onClick={handleRun} variant='default' color='red'>
                                    RUN
                                </Button>
                            )
                        ) : null}
                    </div>
                </div>

                {response && <ReactCodeSinppet lang='json' code={response} />}
            </Accordion.Panel>
        </Accordion.Item>
    );
};

export default FeatureDetailsItem;
