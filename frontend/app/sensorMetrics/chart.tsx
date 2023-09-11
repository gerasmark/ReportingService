import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { Typography } from '@mui/material';
const generateUniqueChartId = () => {
  return `chart-${Math.random().toString(36).substring(7)}`;
};

const BarChart = ({ data, label, title }) => {
  const chartId = generateUniqueChartId(); // Generate a unique chart ID
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Clear any previous chart with the same ID
      Chart.helpers.each(Chart.instances, (instance) => {
        if (instance.chart.canvas.id === chartId) {
          instance.destroy();
        }
      });

      // Create a new chart
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: label,
          datasets: [
            {
              label: 'Values',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false, // Allow the chart to resize
          responsive: true, // Make the chart responsive
        },
      });
    }
  }, [data, label, chartId]);

  return (
    <div style={{ float: 'left', marginRight: '20px' }}>
      <Typography variant="h6" align="center">{title}</Typography>
      <canvas id={chartId} ref={chartRef} width={400} height={200} />
    </div>
  );
};

export default BarChart;
