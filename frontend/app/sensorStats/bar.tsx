import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarPlot({ data, xIndex, xTitle }) {
  return (
    <div style={{ height: '300px', width: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['count']} 
        indexBy= {xIndex}
        padding={0.3}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xTitle
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count', 
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={true}
        width={2000} 
        height={400}
      />
    </div>
  );
}

export default BarPlot;
