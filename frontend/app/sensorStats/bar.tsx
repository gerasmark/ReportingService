import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarPlot({ data, xIndex, yIndex }) {
  return (
    <div style={{ height: '300px', width: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['value']} // Specify the data keys to use for the bars
        indexBy= xIndex // Specify the data key to use for the x-axis labels
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yIndex, // Specify the y-axis label
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false} // Set to true to display labels on the bars
      />
    </div>
  );
}

export default BarPlot;
