// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Link from 'next/link';

// const appBarStyle = {
//   backgroundColor: '#1976D2',
// };

// const titleStyle = {
//   fontWeight: 'bold',
//   fontFamily: 'Arial, sans-serif',
//   fontSize: '24px',
//   textTransform: 'uppercase',
// };

// const buttonContainerStyle = {
//   marginLeft: 'auto', 
//   display: 'flex',
//   alignItems: 'center', 
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div>
//       <AppBar position="static" style={appBarStyle}>
//         <Toolbar>
//           <Typography variant="h6" style={titleStyle}>
//             Sensor App
//           </Typography>
//           <div style={buttonContainerStyle}>
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
//         </Toolbar>
//       </AppBar>
//       <main>{children}</main>
//     </div>

//   )
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}