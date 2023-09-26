'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';

function DeleteSensorReading() {
    const [Id, setId] = useState('');
    const [responseMessage, setResponseMessage] = useState(' ');
    
    const handleDelete = async (Id) => {
      try {
        console.log(Id)
        const response = await fetch(`http://localhost:8000/deleteSensorReading/${Id}/`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          setResponseMessage('Sensor reading deleted successfully');
        } else {
          setResponseMessage('Failed to delete sensor reading');
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
          <InputLabel>Sensor Reading Id</InputLabel>
          <TextField
            value={Id}
            onChange={(e) => setId(e.target.value)}
          />
        <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => handleDelete(Id)}
        >
          Delete Sensor Reading
        </LoadingButton>
        <p>{responseMessage}</p>
        </div>
      </div>
    );
  }
  
  export default DeleteSensorReading;
  