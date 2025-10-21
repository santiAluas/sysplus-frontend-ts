import React from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { TituloComponent } from '../components/TituloComponent';
import DatosAnticipo from '../components/AnulacionAnticiposComp/DatosAnticipo';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const AnulacionAnticipos = () => {
  const [selected, setSeleted] = useState("0")
  return (
    <>
      <NavbarMasterMoto titulo="DEVOLUCION ANTICIPO" />
      <Box sx={{
        flexGrow: 1,
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 3
      }}>
        <TituloComponent texto="BUSCAR ANTICIPO" color="#3498db" />
        <Stack spacing={4}
          direction='flex'
          justifyContent='left'
          alignContent='center'
          flexWrap='wrap' >
          <TextField sx={{ width: '85%' }} />
          <Stack direction='flex'
            justifyContent='center'
            alignContent='center'
          >
            <Button startIcon={<SearchIcon />}
              fullWidth>
              Buscar
            </Button>
          </Stack>
        </Stack>
        <DatosAnticipo />
        <TituloComponent texto="MOTIVO DE AULACION" color="#3498db" mt={10} mb={15} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">MOTIVO</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="MOTIVO"
            fullWidth
            onChange={(e) => setSeleted(e.target.value)}
          >
            <MenuItem value={1}>DESISTE DE LA COMPRA</MenuItem>
            <MenuItem value={2}>CREDITO NEGADO</MenuItem>
            <MenuItem value={3}>OTROS </MenuItem>
          </Select>
          {selected === 3 ?
            <div>
              <TituloComponent texto="ESCRIBA EL MOTIVO" color="#4169E1" mt={10} mb={15} fontSize={15} alingText='center' />
              <TextField multiline={true} maxRows={3} minRows={3} fullWidth />
            </div>
            :
            ""
          }
        </FormControl>
        <Button variant="contained"
          color='error'
          startIcon={<HighlightOffIcon/>}
          elevation
          sx={{ marginTop: '15px', marginBottom: '30px' }}
          size="large"
          fullWidth>ANULAR ANTICIPO</Button>
      </Box>
    </>
  )
}

export default AnulacionAnticipos