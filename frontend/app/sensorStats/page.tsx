'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Plot from 'react-plotly.js';
import Histogram from './histogram';

function SensorStats() {
    const [sensorId, setSensorId] = useState('');
    const [sensorStats, setSensorStats] = useState({});
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
          console.log(allValues);
          setSensorStats(allValues);
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
          onClick={() => handleFilterSubmit(sensorId)}
          loading={loading}
          loadingIndicator="Loading…"
        >
          Filter
        </LoadingButton>
        <Button>
            {sensorStats.range != null? 'View' : 'No Data'}
        </Button>
        <Histogram data={sensorStats} columnName="sensorId" />
        <Plot
        data={[
          {type: 'histogram', x: sensorStats?.sensorId},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
      </div>
    );
  }
  
  export default SensorStats;