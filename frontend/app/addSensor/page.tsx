'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import AppBar from '../AppBar';
import LoadingButton from '@mui/lab/LoadingButton';
import {useForm, Controller } from 'react-hook-form'
import { CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const addSensorPage = () => {
  const {
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState('');


  const handleFilterSubmit = async (data, event) => {
    event.target.reset()
    setLoading(true);
    const response = await fetch('http://127.0.0.1:8000/sensor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      const data = await response.json();
      setResponseMessage('Sensor created successfully');
      setLoading(false);
    } else {
      console.error('Failed to fetch data');
      setResponseMessage('Failed to create Sensor');
      setLoading(false);
    }
  };

  return (
      <div>
        <AppBar />
        <main style={{ marginTop: '20px' }}></main>
    <form onSubmit={handleSubmit(handleFilterSubmit)}>
      <Controller
        name="sensorId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Sensor Id"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <InputLabel>Sensor Type</InputLabel>
      <Controller
        name="type"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
          {...field}
          label="Type"
          variant="outlined"
          fullWidth
          >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="humidity">Humidity</MenuItem>
          <MenuItem value="acoustic">Acoustic</MenuItem>
        </Select>
        )}
      />

      <Controller
        name="vendorName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Vendor Name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="vendorEmail"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Vendor Email"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Location"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="latitude"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Latitude"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="longitude"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Longitude"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
    </form>
    <p>{responseMessage}</p>
    </div>
  );
};

export default addSensorPage;


