import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sampleChartData } from './sampleChartData';
import { Typography } from '@mui/material';

const Recharts = () => {

    const CustomTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-45)"
        >
          {new Date(payload.value).toLocaleDateString()}
        </text>
      </g>
    );
    };
  
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">Recharts Line Chart Example</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={sampleChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="category"
            label={{ value: 'Date', position: 'bottom' }}
            tick={CustomTick}
            height={60}
          />
          <YAxis
            label={{ value: 'Number of Reports', angle: -90, position: 'left' }}
            domain={[20, 120]}
          />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value} reports`, 'Purchase Interest']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="purchase_interest"
            name="Purchase Interest"
            stroke="#2196f3"
            dot={true}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Recharts;