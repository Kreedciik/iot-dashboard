'use client';

import type { ReactNode } from 'react';

import { Box, Paper, Skeleton, Typography } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
  loading?: boolean;
}

export function MetricCard({ title, value, icon, color, loading = false }: MetricCardProps) {
  if (loading) return <Skeleton animation="pulse" variant="rounded" width="362px" height="124px" />;
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderTop: `4px solid ${color}`,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            color,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );
}
