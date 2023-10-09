'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Histogram from './histogram';
import MyResponsiveLine, {data} from './line';

function SensorStats() {
    const [sensorId, setSensorId] = useState('');
    const [sensorStats, setSensorStats] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const handleFilterSubmit = async (sensorId) => {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/sensorStats/${sensorId}/`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          const object = JSON.parse(data);
          const allValues = {};
          for (const item of object) {
            for (const column in item) {
              if (item.hasOwnProperty(column)) {
                if (!allValues[column]) {
                  allValues[column] = [];
                }
                const value = item[column];
                allValues[column].push(value);
              }
            }
          }
          
          const dat = [
            {
              id: 'Reading Value',
              data: object.map((item) => ({
                "x": new Date(item.readingDate).toISOString().split('T')[0], 
                "y": item.readingValue,
              })),
            },
          ];
          console.log(allValues);
          setSensorStats(dat);
          setLoading(false);
          console.log(sensorStats);
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
          onClick={() => handleFilterSubmit(sensorId)}
          loading={loading}
          loadingIndicator="Loading…"
        >
          Filter
        </LoadingButton>
        <Button>
            {sensorStats.range != null? 'View' : 'No Data'}
        </Button>
        <div style={{ height: '100vh', margin: '4rem' }}>
        {sensorStats.length > 0 && <MyResponsiveLine data ={sensorStats} />}
        </div>
      </div>
    );
  }
  
  export default SensorStats;