// Core & MUI
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';

// Styling
import './App.scss';

const drawerWidth = 208;

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (


    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>

        <AppBar
          position="fixed"
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>

        <Box
          component="main"
          sx={{flexGrow: 1, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
        >
          <Toolbar/>
          <Home/>
        </Box>
      </Box>
    </div>
  );
};

export default App;
