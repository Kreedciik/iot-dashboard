import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Air, Opacity, WaterDrop, Thermostat, WaterOutlined } from '@mui/icons-material';

import { DashboardContent } from 'src/layouts/dashboard';

import { NpkCard } from '../npk-card';
import { MetricCard } from '../metric-card';
import { StatusCard } from '../status-card';
import { MetricBarchart } from '../metric-bar-chart';

// ----------------------------------------------------------------------

export function OverviewLiveMonitoringView() {
  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Plant monitoring dashboard
        </Typography>
        <Typography>Last Updated: 10:30:49 AM</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard title="Temperature" color="#FF5722" icon={<Thermostat />} value="32°C" />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard title="Humidity" color="#2196F3" icon={<Opacity />} value="32%" />
        </Grid>
        <Grid xs={12} sm={12} md={4}>
          <MetricCard title="Water Level" color="#03A9F4" icon={<WaterDrop />} value="32%" />
        </Grid>

        <Grid md={12}>
          <NpkCard nitrogen={200} phosphorus={120} potassium={10} />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <StatusCard
            title="Fan Actuator"
            status
            icon={<Air />}
            onLabel="Running"
            offLabel="Stopped"
          />
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <StatusCard
            title="Watering Pump"
            status={false}
            icon={<WaterOutlined />}
            onLabel="Watering"
            offLabel="Idle"
          />
        </Grid>

        <Grid xs={12} md={12}>
          <MetricBarchart
            title="Temperature & Humidity"
            chart={{
              categories: [
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
                '11:18:14 AM',
              ],
              colors: ['#FF5722', '#2196F3'],
              series: [
                { name: 'Temperature', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Humidity', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
