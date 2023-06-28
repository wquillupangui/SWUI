

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './App';
import { Link } from 'react-router-dom';

import { fetchEntities } from '../store/reducers/entitySlice';
import { useLocation } from 'react-router-dom'
import LoadingComponent from './LoadingComponent';
import { Typography, Box, List, ListItem } from '@mui/material';

const EntityList: React.FC = () => {
  const dispatch = useDispatch();

  const entities = useSelector((state: RootState) => state.entities);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchEntities(location.pathname, entities.page));
  }, [location.pathname]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h3" style={{ textTransform: 'capitalize', padding: '1rem' }}>{location.pathname.replace('/', '')} </Typography>
      {entities.loading ? (
        <LoadingComponent />
      ) : (
        <>
          <List>
            {entities.result?.results.map((entity: any, idx: number) => (
              <ListItem key={idx}>
                <Link to={`${location.pathname}/${entity.url.replace(/^\D+/g, '')}`} >
                  <Typography component="b" variant="body1">
                    {'title' in entity ? entity.title : entity.name}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default EntityList;
