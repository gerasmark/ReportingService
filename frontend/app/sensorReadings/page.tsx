'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';

const SensorReadingsPage = () => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [sensorReadings, setSensorReadings] = useState([]);
  const [showAdditionalButton, setShowAdditionalButton] = useState(true);

  const handleFilterSubmit = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/postSensorReadings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "type": "temperature",
        "location": "Ayalafurt",
        "time": ""
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
        <h1>Sensor Readings</h1>
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
        <TableContainer>
          <Table>
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
