// components/Layout.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const appBarStyle = {
  backgroundColor: '#1976D2',
};

const titleStyle = {
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  fontSize: '24px',
  textTransform: 'uppercase',
};

const buttonContainerStyle = {
  marginLeft: 'auto', // Pushes buttons to the right
  display: 'flex',
  alignItems: 'center', // Vertically center the buttons
};

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" style={titleStyle}>
            Sensor App
          </Typography>
          <div style={buttonContainerStyle}>
            <Link href="/sensor-readings">
              <Button variant="contained" color="primary">
                Sensor Readings
              </Button>
            </Link>
            <Link href="/sensor-metrics">
              <Button variant="contained" color="secondary">
                Sensor Metrics
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
