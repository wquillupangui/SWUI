

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './App';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { entitiesClean } from '../store/reducers/entitySlice';

const PopularList: React.FC = () => {
  const dispatch = useDispatch();
  const popularItems = useSelector((state: RootState) => state.popular.popularItems);

  const sortedItems = Object.values(popularItems).sort((a, b) => b.count - a.count);
  useEffect(() => {
    dispatch(entitiesClean());
  }, []);

  return (

    <Box justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h3" style={{ textTransform: 'capitalize', padding: '1rem' }}>Popular</Typography>

      <Table>
        <TableHead>
          <TableRow >
            <TableCell style={{ textAlign: 'center' }}>
              Count
            </TableCell>
            <TableCell >
              Name
            </TableCell>
            <TableCell >
              Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map((value: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {value.count}
              </TableCell>
              <TableCell style={{ textTransform: 'capitalize', fontWeight: 'bold' }} >
                <Link to={`${value.url}`} >
                  {value.name}
                </Link>
              </TableCell>
              <TableCell style={{ textTransform: 'capitalize', }} >
                {value.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

};

export default PopularList;
