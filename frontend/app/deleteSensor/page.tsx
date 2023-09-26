'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';

function DeleteSensor() {
    const [sensorId, setSensorId] = useState('');
    const [responseMessage, setResponseMessage] = useState(' ');
    
    const handleDelete = async (sensorId) => {
      try {
        console.log(sensorId)
        const response = await fetch(`http://localhost:8000/deleteSensor/${sensorId}/`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          setResponseMessage('Sensor deleted successfully');
        } else {
          setResponseMessage('Failed to delete sensor');
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseMessage('An error occurred');
      }
    };

    return (
      <div>
        <AppBar />
        <main style={{ marginTop: '20px' }}></main>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel>Sensor Id</InputLabel>
          <TextField
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          />
        <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => handleDelete(sensorId)}
        >
          Delete Sensor
        </LoadingButton>
        <p>{responseMessage}</p>
        </div>
      </div>
    );
  }
  
  export default DeleteSensor;
  