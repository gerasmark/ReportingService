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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Grid from '@mui/material/Grid';

const addSensorReadingPage = () => {
  const {
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState('');


  const handleFilterSubmit = async (data, event) => {
    setLoading(true);
    try {
     data.readingDate = format(data.readingDate, 'yyyy-MM-dd');
     data.time = format(data.time, 'HH:mm:ss');
    const response = await fetch('http://127.0.0.1:8000/sensorReading/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      const data = await response.json();
      console.log(data)
      setResponseMessage('Sensor Reading created successfully');
      setLoading(false);
    } else {
      console.error('Failed to fetch data');
      setResponseMessage('Failed to create Sensor Reading');
      setLoading(false);
    } 
  } catch {
      setResponseMessage('Failed to create Sensor Reading');
  }
  };

  return (
      <div>
        <AppBar />
        <main style={{ marginTop: '20px' }}></main>
    <form onSubmit={handleSubmit(handleFilterSubmit)}>
    <InputLabel>Id</InputLabel>
      <Controller
        name="Id"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            // label="Id"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <InputLabel>Sensor Id</InputLabel>
      <Controller
        name="sensorId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            // label="Sensor Id"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <InputLabel>Reading Type</InputLabel>
      <Controller
        name="readingType"
        control={control}
        defaultValue=""
        render={({ field }) => (
            
            <Select
            {...field}
            label="Sensor Type"
            variant="outlined"
            fullWidth
            >
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="humidity">Humidity</MenuItem>
            <MenuItem value="acoustic">Acoustic</MenuItem>
          </Select>
        )}
      />
      <InputLabel>Reading Value</InputLabel>
      <Controller
        name="readingValue"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            // label="Reading Value"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <InputLabel>Reading Date</InputLabel>
      <Controller
        name="readingDate"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                {...field}
                label="Select Date"
                inputFormat="dd/MM/yyyy"
                onChange={(readingDate) => {
                  field.onChange(readingDate);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
          </LocalizationProvider>
        )}
      />
      <InputLabel>Description</InputLabel>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            // label="Description"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <InputLabel>Time</InputLabel>
      <Grid item  xs={12}>
      <Controller
        name="time"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                {...field}
                label="Select Time"
                onChange={(time) => {
                  field.onChange(time);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
          </LocalizationProvider>
        )}
      />
      </Grid>
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

export default addSensorReadingPage;


