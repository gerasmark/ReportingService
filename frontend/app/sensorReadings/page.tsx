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
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SensorReadingsPage = () => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [sensorReadings, setSensorReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const handleFilterSubmit = async (number) => {
    setLoading(true);
    setPageNumber(number);
    const response = await fetch('/api/postSensorReadings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        location: location,
        time: time,
        pageNumber: number
    }),
    });
    if (response.ok) {
      const data = await response.json();
      if(number > 1 ) {
        if (JSON.stringify(sensorReadings) == JSON.stringify(data)) {
          setPageNumber(number - 1);
          setLastPage(true);
        }
      }
      setSensorReadings(data); 
      setLoading(false);
    } else {
      setLoading(false);
      console.error('Failed to fetch data');
    }
  };

  const handleFilter = async () => {
    handleFilterSubmit(1);
    setLastPage(false);
  };

  const handlePreviousPage = async () => {
    if (pageNumber > 1) {
      if(lastPage) {
        setLastPage(false);
      }
      handleFilterSubmit(pageNumber - 1);
    }
  };

  const handleNextPage = async () => {
    if (!lastPage) {
      handleFilterSubmit(pageNumber + 1);
    }
  };

  return (
      <div>
        <AppBar />
        <main style={{ marginTop: '20px' }}></main>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel>Sensor Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Sensor Type"
            variant="outlined"
            fullWidth
            >
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="humidity">Humidity</MenuItem>
            <MenuItem value="acoustic">Acoustic</MenuItem>
          </Select>
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
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleFilter}
          loading={loading}
          loadingIndicator="Loading…"
        >
          Filter
        </LoadingButton>
        <Button>
            {sensorReadings.length > 0? 'View' : 'No Data'}
        </Button>
        <Button
        onClick={handlePreviousPage}
        >
          previous
        </Button>
        <Button
        onClick={handleNextPage}
        >
          next
        </Button>
        <Button>
        {((sensorReadings.length > 0) && (loading == false))? pageNumber : ' '}
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
