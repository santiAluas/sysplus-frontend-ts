import React from 'react';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const CabeceraInventario = ({
  seleccionarAgencia,
  seleccionarAgenciaYJefeAgencia,
  agencuasUsuarios,
  userLogin,
  objectAgencia,
}) => {
  const fechaActual = dayjs()
    .locale('es')
    .format('dddd, D [de] MMMM [de] YYYY')
    .toUpperCase();

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 2,
        px: { xs: 2, md: 4 },
        py: 3,
        width: '90%',
        mx: 'auto',
        borderRadius: 3,
        backgroundColor: '#ffffff',
      }}
    >
      <Divider
        sx={{
          mb: 3,
          '&::before, &::after': {
            borderColor: '#d0d7de',
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            color: '#1f2937',
          }}
        >
          INFORMACIÓN DEL INVENTARIO
        </Typography>
      </Divider>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoItem label="EMPRESA" value="UNNOPARTS" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                minWidth: 90,
                color: '#374151',
              }}
            >
              AGENCIA:
            </Typography>

            <FormControl size="small" fullWidth>
              <InputLabel id="agencia-select-label">Agencia</InputLabel>
              <Select
                labelId="agencia-select-label"
                id="agencia-select"
                label="Agencia"
                value={seleccionarAgencia}
                onChange={seleccionarAgenciaYJefeAgencia}
              >
                {agencuasUsuarios?.map((item) => (
                  <MenuItem key={item.idagencia} value={item.idagencia}>
                    {item.nombreagencia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoItem label="FECHA" value={fechaActual} />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoItem label="USUARIO" value={userLogin?.Name || 'SIN USUARIO'} />
        </Grid>

        <Grid item xs={12} md={6}></Grid>

        <Grid item xs={12} md={6}>
          <InfoItem
            label="JEFE AGENCIA"
            value={objectAgencia?.jefeagencia || 'SIN ASIGNAR'}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      sx={{
        minHeight: 40,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          minWidth: 130,
          color: '#374151',
        }}
      >
        {label}:
      </Typography>

      <Box
        sx={{
          px: 1.5,
          py: 0.8,
          minHeight: 36,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 1.5,
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
        }}
      >
        <Typography
          sx={{
            color: '#111827',
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default CabeceraInventario;