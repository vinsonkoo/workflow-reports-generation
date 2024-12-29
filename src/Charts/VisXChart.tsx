import React from 'react';
import { LinePath, Circle } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { useTooltip } from '@visx/tooltip';
import { sampleChartData } from './sampleChartData';
import { Typography } from '@mui/material';
import { timeFormat } from 'd3-time-format';

interface DataPoint {
  date: Date;
  value: number;
}

const VisxChart = () => {
  const sampleData = sampleChartData.map(d => ({
    date: new Date(d.date),
    value: d.purchase_interest
  }));

  // Dimensions
  const width = 1280;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 80, left: 50 }; // Increased bottom margin
  
  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleTime({
    domain: extent(sampleData, d => d.date) as [Date, Date],
    range: [0, xMax],
    padding: 0.2
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...sampleData.map(d => d.value))],
    range: [yMax, 0],
    nice: true
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<DataPoint>();

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent) => {
      const point = localPoint(event);
      if (!point) return;
      
      const x = point.x;
      const xDate = xScale.invert(x);
      
      // Find closest data point
      const closest = sampleData.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.date.getTime() - xDate.getTime());
        const currDiff = Math.abs(curr.date.getTime() - xDate.getTime());
        return prevDiff < currDiff ? prev : curr;
      });

      if (closest) {
        showTooltip({
          tooltipData: closest,
          tooltipLeft: xScale(closest.date),
          tooltipTop: yScale(closest.value)
        });
      }
    },
    [showTooltip, xScale, yScale]
  );

  // Format ticks
  const formatDate = timeFormat("%m/%d/%y");
  const numTicks = 6; // Adjust this number to show more or fewer ticks

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Typography variant="h1">VisX Line Chart Example</Typography>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="white"
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid */}
          <GridRows
            scale={yScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke="#e0e0e0"
          />
          <GridColumns
            scale={xScale}
            height={yMax}
            strokeDasharray="3,3"
            stroke="#e0e0e0"
            numTicks={numTicks}
          />

          {/* Axes */}
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={numTicks}
            tickFormat={formatDate}
            label="Date"
            tickLabelProps={() => ({
              transform: 'rotate(-45)',
              textAnchor: 'end',
              dy: '0.5em',
              dx: '-0.5em',
              fontSize: 12
            })}
            labelProps={{
              fontSize: 14,
              textAnchor: 'middle',
              dy: 60
            }}
          />
          <AxisLeft
            scale={yScale}
            label="Number of Reports"
            labelProps={{
              fontSize: 14,
              textAnchor: 'middle',
              dx: -40
            }}
          />

          {/* Line */}
          <LinePath
            data={sampleData}
            x={d => xScale(d.date)}
            y={d => yScale(d.value)}
            stroke="#2196f3"
            strokeWidth={2}
          />

          {/* Data Points */}
          {sampleData.map((d, i) => (
            <Circle
              key={`point-${i}`}
              cx={xScale(d.date)}
              cy={yScale(d.value)}
              r={4}
              fill="white"
              stroke="#2196f3"
              strokeWidth={2}
            />
          ))}

          {/* Invisible hover area */}
          <rect
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => hideTooltip()}
          />
        </g>
      </svg>
      
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop + margin.top}
          left={tooltipLeft + margin.left}
          style={{
            ...defaultStyles,
            background: 'white',
            border: '1px solid #999',
            padding: '8px',
            fontSize: '12px'
          }}
        >
          <div>Date: {tooltipData.date.toLocaleDateString()}</div>
          <div>Value: {tooltipData.value} reports</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default VisxChart;