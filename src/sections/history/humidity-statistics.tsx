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

interface HumidityGraphProps {
  data?: GroupedAverage[];
  loading?: boolean;
}

// Custom tooltip component that changes color based on humidity
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const humidity = payload[0].value;
    const isHigh = humidity > 70;

    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {`Date: ${label}`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isHigh ? 'info.dark' : 'info.main',
            fontWeight: 'bold',
          }}
        >
          {`Humidity: ${humidity}%`}
          {isHigh && ' (High)'}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default function HumidityGraph({ data = [], loading }: HumidityGraphProps) {
  const theme = useTheme();
  if (loading) return <Skeleton width="100%" height="400px" />;
  return (
    <Card sx={{ width: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" component="div">
            Humidity History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Historical humidity data over time
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {/* Gradient for normal humidity */}
                <linearGradient id="colorNormalHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.info.main} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.palette.info.main} stopOpacity={0} />
                </linearGradient>
                {/* Gradient for high humidity */}
                <linearGradient id="colorHighHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.info.dark} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.palette.info.dark} stopOpacity={0} />
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
                  value: 'Humidity (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: theme.palette.text.primary },
                }}
                fontSize={12}
              />
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <Tooltip content={<CustomTooltip />} />

              {/* Reference line for high humidity threshold */}
              {data.length && (
                <ReferenceLine
                  y={70}
                  stroke={theme.palette.info.dark}
                  strokeDasharray="4 4"
                  label={{
                    value: 'High Humidity Threshold (70%)',
                    position: 'right',
                    fill: theme.palette.info.dark,
                    fontSize: 12,
                  }}
                />
              )}

              {/* Normal humidity area (≤ 70%) */}
              <Area
                type="monotone"
                dataKey="avgHumidity"
                stroke={theme.palette.info.main}
                fillOpacity={1}
                fill="url(#colorNormalHumidity)"
                strokeWidth={2}
              />

              {/* High humidity area (> 70%) */}
              <Area
                type="monotone"
                dataKey="highHumidity"
                stroke={theme.palette.info.dark}
                fillOpacity={1}
                fill="url(#colorHighHumidity)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
