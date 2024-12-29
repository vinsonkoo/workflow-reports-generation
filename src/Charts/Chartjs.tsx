import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  ChartOptions,
  ChartData
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Typography } from '@mui/material';
import { sampleChartData } from './sampleChartData';

// Register ALL required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

// Define interface for data points
interface DataPoint {
  date: string;
  purchase_interest: number;
}

const Chartjs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Create the chart configuration
    const chartData: ChartData<'line'> = {
      datasets: [{
        label: 'Purchase Interest',
        data: sampleChartData.map(item => ({
          x: new Date(item.date).getTime(),
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
      }]
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
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
            label: (context) => {
              return `${context.parsed.y} reports`;
            }
          }
        }
      }
    };

    // Create new chart
    const chart = new ChartJS(ctx, {
      type: 'line',
      data: chartData,
      options: options
    });

    // Cleanup function
    return () => {
      chart.destroy();
    };
  }, []); // Empty dependency array since we don't have any dependencies

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">Chart.js Direct Example</Typography>
      <div style={{ height: '400px', width: '1280px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Chartjs;