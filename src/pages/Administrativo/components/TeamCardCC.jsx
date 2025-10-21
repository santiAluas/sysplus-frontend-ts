import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, LinearProgress } from '@mui/material';

const teams = [
  { name: 'Front-end', percentage: 91, color: 'green' },
  { name: 'UX design', percentage: 84, color: 'green' },
  { name: 'QA', percentage: 72, color: 'green' },
  { name: 'Product', percentage: 65, color: 'red' },
  { name: 'Big Data', percentage: 53, color: 'red' },
  { name: 'Analytics', percentage: 47, color: 'red' }
];

const TeamCardCC = () => {
  return (
    <Card sx={{ width: '100%', padding: 2 }}>
      <CardHeader
        title="RENDIMIENTO PORCENTAJE"
        sx={{ backgroundColor: '#000000', padding: 1 }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {teams.slice(0, 3).map((team, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Typography sx={{ width: 100 }}>{team.name}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={team.percentage}
                  sx={{ width: 100, height: 8, borderRadius: 5, backgroundColor: '#e0e0e0', marginRight: 1 }}
                />
                <Typography sx={{ color: team.color }}>{team.percentage}%</Typography>
              </Box>
            ))}
          </Box>
          <Box>
            {teams.slice(3).map((team, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Typography sx={{ width: 100 }}>{team.name}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={team.percentage}
                  sx={{ width: 100, height: 8, borderRadius: 5, backgroundColor: '#e0e0e0', marginRight: 1 }}
                />
                <Typography sx={{ color: team.color }}>{team.percentage}%</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* <Typography variant="caption" color="textSecondary" mt={2}>
          Last updated 4 days ago
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default TeamCardCC;