// components/Histogram.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Histogram = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Histogram',
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <h1>{title}</h1>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Histogram;
