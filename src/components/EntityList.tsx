

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './App';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchEntities } from '../store/reducers/entitySlice';
import { useLocation } from 'react-router-dom'
import LoadingComponent from './LoadingComponent';
import { Typography, Box, List, ListItem, Button } from '@mui/material';

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
    <Box style={containerStyles} >
      <Typography variant="h3" style={{ textTransform: 'capitalize', padding: '2rem' }}>
        {location.pathname.replaceAll('/', '')}
      </Typography>
      {entities.loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div style={{ padding: '2rem' }}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <List style={{ padding: '2rem' }} >
            {filteredEntities?.map((entity: any, idx: number) => (
              <ListItem key={idx}>
                {renderLink('title' in entity ? entity.title : entity.name, `/${entity.url.replace(/^\D+/g, '')}`)}
              </ListItem>
            ))}
          </List>
          <Box style={containerStyles}>
            {entities.result?.previous && renderLink('Previous', `?page=${entities.result?.previous.replace(/^\D+/g, '')}`)}
            {entities.result?.next && renderLink('Next', `?page=${entities.result?.next.replace(/^\D+/g, '')}`)}
          </Box>
        </>
      )}
    </Box>
  );
};

export default EntityList;
