import React from 'react';
import dayjs from '@/utils/dayjs-setup';

import { Box, Typography, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RangoFechas = ({ setDateInit, setDateEnd, dateInit, dateEnd }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="es"
        dateLibInstance={dayjs}
      >
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <Grid container spacing={2}>
            
            {/* FECHA INICIO */}
            <Grid item xs={12} md={6}>
              <Typography
                fontWeight="600"
                sx={{ mb: 0.5, color: 'text.secondary' }}
              >
                Fecha de inicio del período
              </Typography>

              <DatePicker
                label="Selecciona la fecha inicial"
                value={dateInit}
                onChange={(newValue) => setDateInit(newValue)}
                format="YYYY-MM-DD"
                timezone="America/Guayaquil"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Grid>

            {/* FECHA FIN */}
            <Grid item xs={12} md={6}>
              <Typography
                fontWeight="600"
                sx={{ mb: 0.5, color: 'text.secondary' }}
              >
                Fecha de fin del período
              </Typography>

              <DatePicker
                label="Selecciona la fecha final"
                value={dateEnd}
                onChange={(newValue) => setDateEnd(newValue)}
                format="YYYY-MM-DD"
                timezone="America/Guayaquil"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Grid>

          </Grid>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default RangoFechas;