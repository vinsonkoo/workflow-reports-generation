import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { sampleChartData } from './sampleChartData';
import { Typography } from '@mui/material';

const MUILineChart = () => {

  return (
    <div style={{width: '100%'}}>
      <Typography variant="h1">MUI Line Chart Example</Typography>
      <LineChart
        height={400}
        series={[
          {
            data: sampleChartData.map(d => d.purchase_interest),
            label: 'Purchase Interest',
            color: '#2196f3',
            showMark: true,
            curve: "linear"
          }
        ]}
        xAxis={[{
          data: sampleChartData.map(d => new Date(d.date)),
          scaleType: 'time',
          tickLabelStyle: {
            angle: -45,
            textAnchor: 'end'
          },
          label: 'Date'
        }]}
        yAxis={[{
          label: 'Number of Reports',
          min: 20,
          max: 120
        }]}
        grid={{ vertical: true, horizontal: true }}
        title="Sales Call Trends"
      />
    </div>
  );
};

export default MUILineChart;