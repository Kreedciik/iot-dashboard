import { useState } from 'react';

import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { TimeInterval } from '../time-interval';
import { useStatistics } from './useStatistics';
import HumidityGraph from '../humidity-statistics';
import TemperatureGraph from '../temperature-statistics';
import { SummaryStatistics } from '../summary-statistics';

// ----------------------------------------------------------------------

export function HistoryView() {
  const [days, setDays] = useState<string>('7');
  const { data, isLoading } = useStatistics(days);

  console.log(days);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Historical data analysis
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Paper sx={{ p: '15px' }}>
          <TimeInterval timeRange={days} setTimeRange={setDays} />
        </Paper>

        <SummaryStatistics statistics={data?.generalStatistics} loading={isLoading} />
        <TemperatureGraph loading={isLoading} data={data?.groupedAverage} />
        <HumidityGraph loading={isLoading} data={data?.groupedAverage} />
      </Box>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
