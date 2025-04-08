import type { FC } from 'react';

import React from 'react';
import dayjs from 'dayjs';

import { Box, Select, MenuItem, Typography } from '@mui/material';

interface TimeIntervalProps {
  timeRange: string;
  setTimeRange: (v: string) => void;
}
export const TimeInterval: FC<TimeIntervalProps> = ({ setTimeRange, timeRange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Select
      placeholder="Time Range"
      value={timeRange}
      onChange={(e) => {
        setTimeRange(e.target.value);
      }}
    >
      <MenuItem value="7">Last 7 Days</MenuItem>
      <MenuItem value="14">Last 14 Days</MenuItem>
      <MenuItem value="30">Last 30 Days</MenuItem>
      <MenuItem value="60">Last 60 Days</MenuItem>
      <MenuItem value="90">Last 90 Days</MenuItem>
      <MenuItem value="180">Last 6 Months</MenuItem>
      <MenuItem value="365">Last 12 Months</MenuItem>
      <MenuItem value="500">Last 40 Months</MenuItem>
    </Select>
    <Typography>Current date range:</Typography>
    <Typography>
      <b>
        {' '}
        {dayjs().subtract(+timeRange, 'day').format('MMM D, YYYY')} -{' '}
        {dayjs(new Date()).format('MMM D, YYYY')}
      </b>
    </Typography>
  </Box>
);
