import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Button, Toolbar } from '@mui/material';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static" style={{ background: 'black' }}>
      <Toolbar >
        <Button component={Link} to="/people">People</Button>
        <Button component={Link} to="/films">Films</Button>
        <Button component={Link} to="/starships">Starships</Button>
        <Button component={Link} to="/vehicles">Vehicles</Button>
        <Button component={Link} to="/species">Species</Button>
        <Button component={Link} to="/planets">Planets</Button>
        <Button component={Link} to="/popular">Popular</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;



