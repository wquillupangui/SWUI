import { useState } from 'react';
import { AppBar, Toolbar, Button, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="static" style={{ background: 'black' }}>
      <Toolbar>
        <Hidden mdUp>
          <Button onClick={handleMenuToggle}>Menu</Button>
        </Hidden>
        <Hidden mdDown>
          <Button component={Link} to="/people">People</Button>
          <Button component={Link} to="/films">Films</Button>
          <Button component={Link} to="/starships">Starships</Button>
          <Button component={Link} to="/vehicles">Vehicles</Button>
          <Button component={Link} to="/species">Species</Button>
          <Button component={Link} to="/planets">Planets</Button>
          <Button component={Link} to="/popular">Popular</Button>
        </Hidden>
      </Toolbar>
      <Hidden mdUp>
        {mobileMenuOpen && (
          <div style={{ background: 'white' }}>
            <Button component={Link} to="/people">People</Button>
            <Button component={Link} to="/films">Films</Button>
            <Button component={Link} to="/starships">Starships</Button>
            <Button component={Link} to="/vehicles">Vehicles</Button>
            <Button component={Link} to="/species">Species</Button>
            <Button component={Link} to="/planets">Planets</Button>
            <Button component={Link} to="/popular">Popular</Button>
          </div>
        )}
      </Hidden>
    </AppBar>
  );
}

export default Navbar;
