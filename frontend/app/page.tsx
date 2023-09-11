'use client'
import { useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
function App() {
  const [sensorReadings, setSensorReadings] = useState([]);	
	const handleFilterSubmit = async () => {
    const response = await fetch('/api/postSensorReadings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      <AppBar>
              <Toolbar>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Sensor App
              </Typography>
              <div>
  //             <Link href="/sensorReadings">
  //               <Button variant="contained" color="primary">
  //                 Sensor Readings
  //               </Button>
  //             </Link>
  //             <Link href="/sensorMetrics">
  //               <Button variant="contained" color="secondary">
  //                 Sensor Metrics
  //               </Button>
  //             </Link>
  //           </div>
              </Toolbar>
          </AppBar>
    </div>
	);
}

export default App;