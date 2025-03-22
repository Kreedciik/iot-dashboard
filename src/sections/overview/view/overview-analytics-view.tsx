import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Air, Opacity, WaterDrop, Thermostat, WaterOutlined } from '@mui/icons-material';

import { fTime } from 'src/utils/format-time';
import { formatMetrics } from 'src/utils/format-metrics';

import { DashboardContent } from 'src/layouts/dashboard';

import { NpkCard } from '../npk-card';
import { MetricCard } from '../metric-card';
import { StatusCard } from '../status-card';
import { useSensorDataWS } from './useSensorDataWs';
import { MetricBarchart } from '../metric-bar-chart';

import type { SensorData } from './useSensorDataWs';

// ----------------------------------------------------------------------

const mock: SensorData = {
  date: '2024-02-08 05:20:00',
  temperature: 37,
  humidity: 61,
  water_level: 100,
  N: 255,
  P: 255,
  K: 255,
  fan_off: 0,
  fan_on: 1,
  water_plant_off: 0,
  water_plant_on: 0,
  water_pump_off: 1,
  water_pump_on: 0,
};
export function OverviewLiveMonitoringView() {
  const {
    state: { data },
    actions,
  } = useSensorDataWS();
  console.log(fTime(mock.date));

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Plant monitoring dashboard
        </Typography>
        <Typography>Last Updated: {fTime(data?.date)}</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard
            title="Temperature"
            color="#FF5722"
            icon={<Thermostat />}
            value={formatMetrics(data?.temperature, '°C')}
          />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard
            title="Humidity"
            color="#2196F3"
            icon={<Opacity />}
            value={formatMetrics(data?.humidity, '%')}
          />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard
            title="Water Level"
            color="#03A9F4"
            icon={<WaterDrop />}
            value={formatMetrics(data?.water_level, '%')}
          />
        </Grid>

        <Grid md={12}>
          <NpkCard
            hasData={Boolean(data)}
            nitrogen={data?.N}
            phosphorus={data?.P}
            potassium={data?.K}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <StatusCard
            title="Fan Actuator"
            status={Boolean(data?.fan_on)}
            icon={<Air />}
            onLabel="Running"
            offLabel="Stopped"
            hasData={Boolean(data)}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <StatusCard
            title="Watering Pump"
            status={Boolean(data?.water_pump_on)}
            icon={<WaterOutlined />}
            onLabel="Watering"
            offLabel="Idle"
            hasData={Boolean(data)}
          />
        </Grid>

        <Grid xs={12} md={12}>
          <MetricBarchart
            title="Temperature & Humidity"
            chart={{
              categories: actions.getCategories(),
              colors: ['#FF5722', '#2196F3'],
              series: [
                { name: 'Temperature', data: actions.getTemperatureValues() },
                { name: 'Humidity', data: actions.getHumidityValues() },
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
