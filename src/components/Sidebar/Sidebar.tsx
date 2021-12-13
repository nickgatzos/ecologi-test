import { Toolbar, Divider, List, ListItem, Box, Drawer } from '@mui/material';
import './Sidebar.scss';

interface Props {
  mobileOpen: boolean,
  drawerWidth: number,
  handleDrawerToggle: any
}

const Sidebar = ({mobileOpen, drawerWidth, handleDrawerToggle}: Props) => {
  const drawer = (
    <div className="sidebar-content">
      <Toolbar>
        <a href="//ecologi.com">
          <img src="https://ecologi.com/images/app/nav/logo.svg" alt="Ecologi Logo"/>
        </a>
      </Toolbar>
      <Divider/>
      <List>
        <ListItem button selected>Dashboard</ListItem>
        <ListItem button>Project Insights</ListItem>
        <ListItem button>Badges</ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button>Invest in Ecologi</ListItem>
        <ListItem button>FAQs</ListItem>
        <ListItem button>Community Forum</ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button>Logout</ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="navigation"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        className="sidebar"
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        className="sidebar"
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
