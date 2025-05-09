import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const services = [
  { label: 'Attendance', icon: <AssignmentIndIcon fontSize="large" />, color: '#e3f0fa' },
  { label: 'Track Leaves', icon: <EventNoteIcon fontSize="large" />, color: '#f3e6fa' },
  { label: 'Announcements', icon: <AnnouncementIcon fontSize="large" />, color: '#fae3e3' },
  { label: 'Calendar', icon: <CalendarMonthIcon fontSize="large" />, color: '#faf7e3' },
  { label: 'On Duty', icon: <AccessTimeIcon fontSize="large" />, color: '#e3faf7' },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: { xs: 1, sm: 4 }, maxWidth: 1100, mx: 'auto', mt: 2 }}>
      {/* On Duty Card */}
      <Card sx={{ mb: 3, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)', px: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>On Duty</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Sat, 1 Jun 25
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon fontSize="small" color="primary" />
            <Typography variant="body2">Punch in 8 : 30 AM</Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Today's Attendance Card */}
      <Card sx={{ mb: 3, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)', px: 2 }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Your today's attendance</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Sat, 25 May, 2024
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon fontSize="small" color="primary" />
                <Typography variant="body2">Punch in 8 : 30 AM</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                <AccessTimeIcon fontSize="small" color="primary" />
                <Typography variant="body2">Punch out 5 : 40 PM</Typography>
              </Stack>
              <Button size="small" sx={{ mt: 1, textTransform: 'none', color: '#1976d2', fontWeight: 600 }}>Today</Button>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center', mt: { xs: 2, md: 0 } }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <svg width="64" height="64">
                  <circle cx="32" cy="32" r="28" fill="#f5f5f5" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#ff9800" strokeWidth="6" strokeDasharray={175.93} strokeDashoffset={87.96} />
                </svg>
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>4/8</Typography>
                  <Typography variant="caption">hours</Typography>
                </Box>
              </Box>
              <Box sx={{ ml: 2, bgcolor: '#eafbe7', px: 2, py: 0.5, borderRadius: 2, fontWeight: 600, color: '#388e3c', fontSize: 16 }}>Present</Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* All Faculty Attendance Card */}
      <Card sx={{ mb: 3, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)', px: 2 }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" fontWeight={700}>Today's All faculty Attendance</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Sat, 25 May 2024
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" sx={{ textTransform: 'none', color: '#1976d2', fontWeight: 600 }}>See All</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">Total</Typography>
              <Typography variant="h6" fontWeight={700}>120</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">Present</Typography>
              <Typography variant="h6" fontWeight={700} sx={{ color: 'green' }}>80</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">Absent</Typography>
              <Typography variant="h6" fontWeight={700} sx={{ color: 'red' }}>5</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle2" color="text.secondary">On Duty</Typography>
              <Typography variant="h6" fontWeight={700}>0</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, letterSpacing: 0.5 }}>Services</Typography>
        <Grid container spacing={3}>
          {services.map((service, idx) => (
            <Grid item xs={6} sm={4} md={2.4} key={service.label}>
              <Card sx={{
                background: service.color,
                borderRadius: 4,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                cursor: 'pointer',
                p: 2.5,
                textAlign: 'center',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s, box-shadow 0.15s',
                '&:hover': {
                  boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.10)',
                  transform: 'translateY(-4px) scale(1.04)'
                }
              }}>
                <Box sx={{ mb: 1, color: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{service.icon}</Box>
                <Typography variant="body1" fontWeight={600} sx={{ fontSize: 16, color: '#222' }}>{service.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard; 