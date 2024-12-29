import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer
} from 'victory';
import { sampleChartData } from './sampleChartData';
import { Typography } from '@mui/material';

const CustomVictoryChart = () => {

  const formattedData = sampleChartData.map(d => ({
    x: new Date(d.date),
    y: d.purchase_interest
  }));

  return (
    <div style={{width: '100%'}}>
      <Typography variant="h1">Victory Line Chart Example</Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        width={800}
        height={400}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => 
              `${datum.y} reports\n${datum.x.toLocaleDateString()}`
            }
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => new Date(x).toLocaleDateString()}
          label="Date"
        />
        <VictoryAxis
          dependentAxis
          label="Number of Reports"
        />
        <VictoryLine
          data={formattedData}
          style={{
            data: { stroke: "#2196f3" }
          }}
          interpolation="monotoneX"
        />
      </VictoryChart>
    </div>
  );
};

export default CustomVictoryChart;