'use client';

import type { ReactNode } from 'react';

import { Box, Chip, Paper, Typography } from '@mui/material';

interface StatusCardProps {
  title: string;
  status: boolean;
  icon: ReactNode;
  onLabel: string;
  offLabel: string;
}

export function StatusCard({ title, status, icon, onLabel, offLabel }: StatusCardProps) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderLeft: `4px solid ${status ? '#4CAF50' : '#F44336'}`,
        transition: 'all 0.3s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              color: status ? '#4CAF50' : '#F44336',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        <Chip
          label={status ? onLabel : offLabel}
          color={status ? 'success' : 'error'}
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60px',
        }}
      >
        <Box
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: status ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '-30%',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: status ? '#4CAF50' : '#F44336',
              boxShadow: status ? '0 0 10px #4CAF50' : 'none',
              animation: status ? 'pulse 1.5s infinite' : 'none',
            },
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
              },
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              bottom: '-25px',
              color: status ? '#4CAF50' : '#F44336',
              fontWeight: 'bold',
            }}
          >
            {status ? 'ON' : 'OFF'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
