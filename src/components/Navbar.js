import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                    sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    MyApp
                </Typography>

                {/* Menu for small screens */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem onClick={handleMenuClose}>About</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                </Menu>

                {/* Buttons for medium to large screens */}
                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                    <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>Home</Button>
                    <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>About</Button>
                    <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>Contact</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
