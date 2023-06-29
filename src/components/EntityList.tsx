

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './App';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchEntities } from '../store/reducers/entitySlice';
import { useLocation } from 'react-router-dom'
import LoadingComponent from './LoadingComponent';
import { Typography, Box, List, ListItem, Button, Grid, TextField } from '@mui/material';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const EntityList: React.FC = () => {
  const dispatch = useDispatch();
  const entities = useSelector((state: RootState) => state.entities);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    dispatch(fetchEntities(location.pathname, page));
    setSearchQuery('')
  }, [location.pathname, page]);

  const filteredEntities = entities.result?.results.filter((entity: any) =>
    'title' in entity ? entity.title.toLowerCase().includes(searchQuery.toLowerCase()) : entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLink = (text: string, path: string) => (
    <Link to={`${location.pathname}${path}`} style={{ padding: " 0.2rem 1rem" }} >
      <Typography component="b" variant="body1">
        {text}
      </Typography>
    </Link>
  );

  return (
    <Grid container direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Typography variant="h3" style={{ textTransform: 'capitalize', padding: '2rem' }}>
          {location.pathname.replaceAll('/', '')}
        </Typography>
      </Grid>
      {entities.loading ? (
        <LoadingComponent />
      ) : (
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item>
            <List>
              {filteredEntities?.map((entity: any, idx: number) => (
                <ListItem key={idx}>
                  {renderLink('title' in entity ? entity.title : entity.name, `/${entity.url.replace(/^\D+/g, '')}`)}
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <Box>
              {entities.result?.previous && renderLink('Previous', `?page=${entities.result?.previous.replace(/^\D+/g, '')}`)}
              {entities.result?.next && renderLink('Next', `?page=${entities.result?.next.replace(/^\D+/g, '')}`)}
            </Box>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default EntityList;
