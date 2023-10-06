import React, { useEffect } from 'react';
import Plotly from 'react-plotly.js';
import dynamic from 'next/dynamic'

const HistogramChart = ({ data, columnName }) => {
  useEffect(() => {
    if (data && data[columnName]) {
      const columnData = data[columnName];
      const trace = {
        x: columnData,
        type: 'histogram',
        bins: 10,
      };
      const layout = {
        title: `Histogram for ${columnName}`,
        xaxis: {
          title: columnName,
        },
        yaxis: {
          title: 'Frequency',
        },
      };
      Plotly.newPlot('histogram-chart', [trace], layout);
      return () => {
        Plotly.purge('histogram-chart');
      };
    }
  }, [data, columnName]);

  return (
    <div id="histogram-chart"></div>
  );
};

export default dynamic(() => Promise.resolve(HistogramChart), {
  ssr: false
});
