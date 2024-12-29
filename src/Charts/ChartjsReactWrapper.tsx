import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Typography } from '@mui/material';
import { sampleChartData } from './sampleChartData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ChartjsReactWrapper = () => {

  const data = {
    datasets: [
      {
        label: 'Purchase Interest',
        data: sampleChartData.map(item => ({
          x: new Date(item.date),
          y: item.purchase_interest
        })),
        borderColor: '#2196f3',
        backgroundColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderColor: '#2196f3',
        pointBorderWidth: 2,
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month' as const,
          displayFormats: {
            month: 'MMM dd'
          }
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Reports',
          font: {
            size: 14
          }
        },
        min: 0,
        max: 120,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart Example',
        font: {
          size: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y} reports`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">Chart.js React Wrapper Line Chart Example</Typography>
      <div style={{ height: '400px', width: '1280px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartjsReactWrapper;