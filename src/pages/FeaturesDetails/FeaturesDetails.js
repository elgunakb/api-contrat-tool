import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getFeatureDetailsList,
    getFeaturesListById,
    setDrawerProps,
} from '../../redux/actions/features';
import { Accordion, Button } from '@mantine/core';
import Drawers from '../../components/Drawer/Drawers';
import style from './FeatureDetails.module.scss';
import classNames from 'classnames';
import FeatureDetailsItem from './FeatureDetailsItem';

const FeaturesDetails = () => {
    const { featureListById, featureDetailsList } = useSelector(state => state.featureNewModal);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeaturesListById(id));
        dispatch(getFeatureDetailsList(id));
    }, []);

    if (!featureListById) {
        return null;
    }

    const openDrawer = () => {
        dispatch(setDrawerProps({ isVisible: true }));
    };

    return (
        <>
            <div className={style.futureSectionContainer}>
                <span className={classNames(style.futureTitle, style[featureListById.status])}>
                    <span>
                        <h2>{featureListById.name}</h2>
                        <p>({featureListById.status})</p>
                    </span>
                    <Button onClick={openDrawer}>+ NEW</Button>
                </span>
                {featureDetailsList
                    ? Object.entries(featureDetailsList).map(([app, endpoints], index) => (
                          <Accordion transitionDuration={300.5} key={endpoints.id} multiple variant='separated'>
                              <Accordion.Item value={`panel-${index}`}>
                                  <Accordion.Control style={{ display: 'flex', marginRight: '20px' }}>
                                      <h4>{`${app.charAt(0).toUpperCase()}${app.slice(1)}`}</h4>
                                  </Accordion.Control>
                                  <Accordion.Panel>
                                      {endpoints.map(endpoint => (
                                          <FeatureDetailsItem key={endpoint.id} endpoint={endpoint} />
                                      ))}
                                  </Accordion.Panel>
                              </Accordion.Item>
                          </Accordion>
                      ))
                    : null}
            </div>
            <Drawers />
        </>
    );
};

export default FeaturesDetails;
