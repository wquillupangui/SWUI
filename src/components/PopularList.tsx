

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './App';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { entitiesClean } from '../store/reducers/entitySlice';
import { useAppDispatch } from '../store/hooks';

const PopularList: React.FC = () => {
  const dispatch = useAppDispatch();
  const popularItems = useSelector((state: RootState) => state.popular.popularItems);

  const sortedItems = Object.values(popularItems).sort((a, b) => b.count - a.count);
  useEffect(() => {
    dispatch(entitiesClean());
  }, [dispatch]);

  return (
    <Box justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
      <Typography variant="h3" align="center" gutterBottom>
        Popular
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Count
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
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
                <TableCell style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                  <Link to={`${value.url}`} >
                    {value.name}
                  </Link>
                </TableCell>
                <TableCell style={{ textTransform: 'capitalize' }}>
                  {value.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

};

export default PopularList;
