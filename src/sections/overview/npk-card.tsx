import { When } from 'react-if';

import { Grass } from '@mui/icons-material';
import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';

interface NpkCardProps {
  nitrogen: number | undefined; // 0-255
  phosphorus: number | undefined; // 0-255
  potassium: number | undefined; // 0-255
  hasData: boolean;
}

export function NpkCard({ nitrogen = 0, phosphorus = 0, potassium = 0, hasData }: NpkCardProps) {
  // Convert 0-255 scale to 0-100 percentage for display
  const nitrogenPercent = (nitrogen / 255) * 100;
  const phosphorusPercent = (phosphorus / 255) * 100;
  const potassiumPercent = (potassium / 255) * 100;

  // Function to determine level text based on value
  const getLevelText = (value: number) => {
    if (value < 85) return 'Low';
    if (value < 170) return 'Medium';
    return 'High';
  };

  // Function to determine color based on value
  const getColor = (value: number) => {
    if (value < 85) return '#FFC107'; // Yellow for low
    if (value < 170) return '#4CAF50'; // Green for medium
    return '#2196F3'; // Blue for high
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderTop: '4px solid #4CAF50',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ mr: 1, color: '#4CAF50' }}>
          <Grass />
        </Box>
        <Typography variant="h6" component="h2">
          Soil Nutrition (NPK)
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Nitrogen */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#4CAF50">
                Nitrogen (N)
              </Typography>
              <Typography variant="subtitle1">{nitrogen} / 255</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={nitrogenPercent}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColor(nitrogen),
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <When condition={hasData}>
                <Typography variant="body2" color="text.secondary">
                  Level: {getLevelText(nitrogen)}
                </Typography>
              </When>
              <Typography variant="body2" color="text.secondary">
                {nitrogenPercent.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Phosphorus */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#FF9800">
                Phosphorus (P)
              </Typography>
              <Typography variant="subtitle1">{phosphorus} / 255</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={phosphorusPercent}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColor(phosphorus),
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <When condition={hasData}>
                <Typography variant="body2" color="text.secondary">
                  Level: {getLevelText(phosphorus)}
                </Typography>
              </When>
              <Typography variant="body2" color="text.secondary">
                {phosphorusPercent.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Potassium */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#9C27B0">
                Potassium (K)
              </Typography>
              <Typography variant="subtitle1">{potassium} / 255</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={potassiumPercent}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(156, 39, 176, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColor(potassium),
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <When condition={hasData}>
                <Typography variant="body2" color="text.secondary">
                  Level: {getLevelText(potassium)}
                </Typography>
              </When>
              <Typography variant="body2" color="text.secondary">
                {potassiumPercent.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          NPK values represent the three primary nutrients in soil: Nitrogen (N) for leaf growth,
          Phosphorus (P) for root development, and Potassium (K) for overall plant health.
        </Typography>
      </Box>
    </Paper>
  );
}
