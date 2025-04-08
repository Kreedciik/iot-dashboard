import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

import { Box, Card, useTheme, Skeleton, Typography, CardContent } from '@mui/material';

import type { GroupedAverage } from './view/useStatistics';

interface TemperatureGraphProps {
  data?: GroupedAverage[];
  loading?: boolean;
}

// Custom tooltip component that changes color based on temperature
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value;
    const isHigh = temp > 50;

    return (
      <div className="p-3 bg-background border border-border rounded shadow-md">
        <p className="mb-1">{`Date: ${label}`}</p>
        <p style={{ color: isHigh ? '#ef4444' : '#8884d8', fontWeight: 'bold' }}>
          {`Temperature: ${temp}°C`}
          {isHigh && ' (High)'}
        </p>
      </div>
    );
  }

  return null;
};

export default function TemperatureGraph({ data = [], loading }: TemperatureGraphProps) {
  const theme = useTheme();
  if (loading) return <Skeleton width="100%" height="400px" />;
  return (
    <Card sx={{ width: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" component="div">
            Temperature History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Historical temperature data over time
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {/* Gradient for normal temperatures */}
                <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                </linearGradient>
                {/* Gradient for high temperatures */}
                <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: theme.palette.text.primary }}
                tickLine={{ stroke: theme.palette.text.secondary }}
                fontSize={12}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: theme.palette.text.primary }}
                tickLine={{ stroke: theme.palette.text.secondary }}
                label={{
                  value: 'Temperature (°C)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: theme.palette.text.primary },
                }}
                fontSize={12}
              />
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <Tooltip content={<CustomTooltip />} />

              {/* Reference line for high temperature threshold */}
              {data.length && (
                <ReferenceLine
                  y={50}
                  stroke={theme.palette.error.main}
                  strokeDasharray="4 4"
                  label={{
                    value: 'High Temp Threshold (50°C)',
                    position: 'right',
                    fill: theme.palette.error.main,
                    fontSize: 12,
                  }}
                />
              )}

              {/* Normal temperature area (≤ 28°C) */}
              <Area
                type="monotone"
                dataKey="avgTemperature"
                stroke={theme.palette.primary.main}
                fillOpacity={1}
                fill="url(#colorNormal)"
                strokeWidth={2}
              />

              {/* High temperature area (> 28°C) */}
              <Area
                type="monotone"
                dataKey="highTemp"
                stroke={theme.palette.error.main}
                fillOpacity={1}
                fill="url(#colorHigh)"
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
