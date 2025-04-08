import type { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import { Grass, Opacity, Thermostat, WaterOutlined } from '@mui/icons-material';

import { formatMetrics } from 'src/utils/format-metrics';

import { MetricCard } from '../overview/metric-card';

import type { GeneralStatistics } from './view/useStatistics';

interface SummaryProps {
  statistics?: GeneralStatistics;
  loading?: boolean;
}
export const SummaryStatistics: FC<SummaryProps> = ({ statistics, loading }) => (
  <>
    <Typography variant="h5">Summary statistics</Typography>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg Temperature"
          value={formatMetrics(statistics?.temperature, ' °C')}
          icon={<Thermostat />}
          color="#FF5722"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg Humidity"
          value={formatMetrics(statistics?.humidity, ' %')}
          icon={<Opacity />}
          color="#2196F3"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg Nitrogen"
          value={formatMetrics(statistics?.nitrogen, '')}
          icon={<Grass />}
          color="#4CAF50"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg Phosphorus"
          value={formatMetrics(statistics?.phosphorus, '')}
          icon={<Grass />}
          color="#FF9800"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg Potassium"
          value={formatMetrics(statistics?.potassium, '')}
          icon={<Grass />}
          color="#9C27B0"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MetricCard
          title="Avg water level"
          value={formatMetrics(statistics?.waterLevel, '%')}
          icon={<WaterOutlined />}
          color="#03A9F4"
          loading={loading}
        />
      </Grid>
    </Grid>
  </>
);
