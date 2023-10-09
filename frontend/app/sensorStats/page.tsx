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
    const [monthStats, setMonthStats] = useState([]);
    const [dailyStats, setDailyStats] = useState([]);
    const [weekdayStats, setWeekdayStats] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const handleFilterSubmit = async (sensorId) => {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/sensorStats/${sensorId}/`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          const object = JSON.parse(data);
          console.log(object);
          // const allValues = {};
          // for (const item of object) {
          //   for (const column in item) {
          //     if (item.hasOwnProperty(column)) {
          //       if (!allValues[column]) {
          //         allValues[column] = [];
          //       }
          //       const value = item[column];
          //       allValues[column].push(value);
          //     }
          //   }
          // }
          
          const dat = [
            {
              id: 'Reading Value',
              color: "hsl(151, 70%, 50%)",
              data: object["month_mean"].map((item) => ({
                "x": item.month ,
                "y": item.readingValue,
              })),
            },
          ];
          setMonthStats(dat);
          const d = [
            {
              id: 'Reading Value',
              color: "hsl(151, 70%, 50%)",
              data: object["date_mean"].map((item) => ({
                "x": item.readingDate ,
                "y": item.readingValue,
              })),
            },
          ];
          setDailyStats(d);

          const w = [
            {
              id: 'Reading Value',
              color: "hsl(151, 70%, 50%)",
              data: object["weekday_mean"].map((item) => ({
                "x": item.weekday ,
                "y": item.readingValue,
              })),
            },
          ];
          setWeekdayStats(w);
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
            {monthStats.length != null? 'View' : 'No Data'}
        </Button>
        <div style={{ height: '40vh', margin: '1rem' }}>
        <div style={{  textAlign: 'center', marginBottom: '20px', padding: '20px', borderRadius: '10px', background: '#f0f0f0', width: '100%' }}>
        <InputLabel>Monthly Mean</InputLabel>
        </div>
        {monthStats.length > 0 && <MyResponsiveLine data ={monthStats} xAxisLabel="Month" yAxisLabel="readingValue" />}
        <div style={{  textAlign: 'center', marginBottom: '20px', padding: '20px', borderRadius: '10px', background: '#f0f0f0', width: '100%' }}>
        <InputLabel>Daily Mean</InputLabel>
        </div>
        {dailyStats.length > 0 && <MyResponsiveLine data ={dailyStats} xAxisLabel="Reading Date" yAxisLabel="readingValue" />}
        <main style={{ marginTop: '10px' }}></main>
        <div style={{  textAlign: 'center', marginBottom: '20px', padding: '20px', borderRadius: '10px', background: '#f0f0f0', width: '100%' }}>
        <InputLabel>Weekday Mean</InputLabel>
        </div>
        {weekdayStats.length > 0 && <MyResponsiveLine data ={weekdayStats} xAxisLabel="Weekday" yAxisLabel="readingValue" />}
        </div>
      </div>
    );
  }
  
  export default SensorStats;