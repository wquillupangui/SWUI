
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './App';
import { Link } from 'react-router-dom';

import { fetchEntity } from '../store/reducers/entitySlice';
import { useLocation } from 'react-router-dom'
import LoadingComponent from './LoadingComponent';
import { Typography, Box, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { type } from 'os';
import { incrementPopularItem } from '../store/reducers/popularSlice';




const ArrayLink = ({ value, name }: any) => {
  if (!Array.isArray(value)) {
    return <>{value}</>
  }
  return (
    <div style={{ display: 'grid' }}>
      {value.map((iter: any, idx: number) => (
        <Link key={idx} to={`/${iter.substring(iter.indexOf('api/') + 4)}`} >
          <Typography component="b" variant="body1" style={{ textTransform: 'capitalize' }}>
            {name} {idx + 1}
          </Typography>
        </Link>

      ))}

    </div>)
}

const EntityDetail: React.FC = () => {
  const dispatch = useDispatch();
  const entities = useSelector((state: RootState) => state.entities);
  const { selected } = entities
  const location = useLocation();

  const arrValues = selected ? Object.entries(selected) : []

  useEffect(() => {
    dispatch(fetchEntity(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const tempItem = {
      name: selected ? ('title' in selected ? selected.title : selected.name) : '',
      type: location.pathname.substring(1, location.pathname.indexOf('/', 1)),
      url: location.pathname,
      count: 1
    }
    selected && dispatch(incrementPopularItem(tempItem))
  }, [selected]);

  return (
    <Box justifyContent="center" alignItems="center" minHeight="100vh">
      {!entities.loading && selected && <Typography variant="h3" style={{ textTransform: 'capitalize', padding: '1rem' }}>{'title' in selected ? selected.title : selected.name}</Typography>}
      {entities.loading ? (
        <LoadingComponent />
      ) : (
        <>
          <TableContainer component={Paper} style={{ padding: '1rem' }}>
            <Table>
              <TableBody>
                {arrValues.map((value: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell style={{ textTransform: 'capitalize', fontWeight: 'bold' }} >
                      {value[0].replace(/_/g, ' ')} :
                    </TableCell>
                    <TableCell>
                      <ArrayLink key={idx} value={value[1]} name={value[0]} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};



export default EntityDetail;
