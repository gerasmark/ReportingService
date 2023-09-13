import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Sensor App
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Link href="/sensorReadings" color="inherit" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" style={{ marginRight: '10px' }}>
              Sensor Readings
            </Button>
          </Link>
          <Link href="/sensorMetrics" color="inherit" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary">
              Sensor Metrics
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
