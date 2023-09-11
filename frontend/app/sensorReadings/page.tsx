'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const SensorReadingsPage = () => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [sensorReadings, setSensorReadings] = useState([]);

  const handleFilterSubmit = async () => {
    const response = await fetch('/api/postSensorReadings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        location: location,
        time: time,
    }),
    });
    if (response.ok) {
      const data = await response.json();
      setSensorReadings(data); 
    } else {
      console.error('Failed to fetch data');
    }
  };

  return (
      <div>
        <AppBar>
            <Toolbar>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Sensor App
            </Typography>
            <div>
//             <Link href="/sensorReadings">
//               <Button variant="contained" color="primary">
//                 Sensor Readings
//               </Button>
//             </Link>
//             <Link href="/sensorMetrics">
//               <Button variant="contained" color="secondary">
//                 Sensor Metrics
//               </Button>
//             </Link>
//           </div>
            </Toolbar>
        </AppBar>
        <main style={{ marginTop: '80px' }}></main>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel>Sensor Type</InputLabel>
          <TextField
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <InputLabel>Sensor Location</InputLabel>
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <InputLabel>Time</InputLabel>
          <TextField
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick = {handleFilterSubmit}
        >
          Filter 
        </Button>
        <Button>
            {sensorReadings.length > 0? 'View' : 'No Data'}
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Senosr Id</TableCell>
                <TableCell>Reading Type</TableCell>
                <TableCell>Reading Value</TableCell>
                <TableCell>Reading Date</TableCell>
                <TableCell>Reading Description</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorReadings.map((sensorReadings, index) => (
                <TableRow key={index}>
                  <TableCell>{sensorReadings.Id}</TableCell>
                  <TableCell>{sensorReadings.sensorId}</TableCell>
                  <TableCell>{sensorReadings.readingType}</TableCell>
                  <TableCell>{sensorReadings.readingValue}</TableCell>
                  <TableCell>{sensorReadings.readingDate}</TableCell>
                  <TableCell>{sensorReadings.description}</TableCell>
                  <TableCell>{sensorReadings.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default SensorReadingsPage;
