import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Tabs>
        <Tab label="People" component={Link} to="/people" />
        <Tab label="Films" component={Link} to="/films" />
        <Tab label="Starships" component={Link} to="/starships" />
        <Tab label="Vehicles" component={Link} to="/vehicles" />
        <Tab label="Species" component={Link} to="/species" />
        <Tab label="Planets" component={Link} to="/planets" />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;



