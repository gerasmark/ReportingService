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
import TableHead from '@mui/material/TableHead';
import AppBar from '../AppBar';
import BarChart from './chart';
import LoadingButton from '@mui/lab/LoadingButton';

const SensorMetricsPage = () => {
  const [sensorId, setSensorId] = useState('');
  const [sensorMetrics, setSensorMetrics] = useState([]);
  const [max10Sensors, setMax10Sensors] = useState([]);
  const [min10Sensors, setMin10Sensors] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleFilterSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/postSensorMetrics/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sensorId: sensorId,
    }),
    });
    if (response.ok) {
      const data = await response.json();
      setSensorMetrics(data); 
      setMax10Sensors(data.maxValues);
      setMin10Sensors(data.minValues);
      setLoading(false);
    } else {
      console.error('Failed to fetch data');
      setLoading(false);
    }
  };

  return (
      <div>
        <AppBar />
        <main style={{ marginTop: '20px' }}></main>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel>Senosr Id</InputLabel>
          <TextField
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          />
        </div>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleFilterSubmit}
          loading={loading}
          loadingIndicator="Loading…"
        >
          Filter
        </LoadingButton>
        <Button>
            {sensorMetrics.range != null? 'View' : 'No Data'}
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mean value</TableCell>
                <TableCell>Min Value</TableCell>
                <TableCell>Max Value</TableCell>
                <TableCell>Range</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell>{sensorMetrics.mean}</TableCell>
                  <TableCell>{sensorMetrics.min}</TableCell>
                  <TableCell>{sensorMetrics.max}</TableCell>
                  <TableCell>{sensorMetrics.range}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer> 
        <div style={{ clear: 'both' }}>
        <BarChart data={max10Sensors} label={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} title='10 Maximum Values' />
        <BarChart data={min10Sensors} label={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} title='10 Minimum Values' />
      </div>
      </div>
  );
};

export default SensorMetricsPage;


