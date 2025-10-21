import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LabelInfo from './LabelInfo'
import { v4 as uuidv4 } from 'uuid';
import SearchBlobal from '../../../components/SearchBlobal';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import SaveIcon from '@mui/icons-material/Save';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
const CabeceraLiquidacionGrabar = ({ valorTotalLote,
  valorTotalDocumentos,
  setEsLiquidacionParcial,
  setEsLiquidacionPorCtv,
  codigoLiquidacion,
  setCodigoLiquidacion,
  funcionConfirm,
  observacionLiquidacion,
  setObservacionLiquidacion,
  esLiquidacionorCtv,
  esLiquidacionParcial,
  BuscarLiquidacion,
  setTerminoBuscador,
  resetComponent,
  codigoIDLiquidacion,
  terminoBuscador }) => {

  const generarNumeroLiquidacion = () => {
    const numeroAleatorio = uuidv4().replace(/-/g, '').substring(0, 15).toUpperCase();
    setCodigoLiquidacion(`LIQUI-${numeroAleatorio}`)
  }

  useEffect(() => {
    generarNumeroLiquidacion()
  }, []);

  const checkLiquidacionParcial = (event) => {
    setEsLiquidacionParcial(event.target.checked);
  };

  const checkLiquidacionCtv = (event) => {
    setEsLiquidacionPorCtv(event.target.checked);
  };

  const fontSize = 14;
  const styleCheck = { '& .MuiFormControlLabel-label': { fontSize: '12px' } }
  const propsLabe = {sx: { fontSize: '12px'}}
  
  return (
    <Box component="fieldset"
      sx={{ borderRadius: 1 }}>
      <legend>ACCIONES GRABAR</legend>
      <Grid container spacing={1} mb={1}>
        <Grid item lg={12} sm={12}>
          <SearchBlobal parameterSearch={terminoBuscador}
            setParameterSearch={setTerminoBuscador}
            functionExecute={BuscarLiquidacion}
            title='BUSCAR NUMERO DE LIQUIDACION' />
        </Grid>
        <Grid item lg={12}>
          <Divider>
            <Chip label="OPCIONES DE LIQUIDACION" size="small" />
          </Divider>
        </Grid>
        <Grid item lg={3} sm={12} sx={{display:'none'}}>
          <LabelInfo title="CODIGO ID LIQUIDACION: " fontSize={12} information={codigoIDLiquidacion} />
        </Grid>
        <Grid item lg={3} sm={12}>
          <LabelInfo title="CODIGO LIQUIDACION: " fontSize={12} information={codigoLiquidacion} />
        </Grid>
        <Grid item lg={5} sm={12}>
          <FormGroup row sx={{
            gap: 2, display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '6'
          }} >
            <FormControlLabel 
              checked={esLiquidacionParcial}
              onChange={checkLiquidacionParcial}
              control={<Checkbox />}
              sx={styleCheck}
              label="LIQUIDACION PARCIAL" />
            <FormControlLabel 
              checked={esLiquidacionorCtv}
              sx={styleCheck}
              onChange={checkLiquidacionCtv}
              control={<Checkbox />}
              label="LIQUIDACION POR CENTAVOS" />
          </FormGroup>
        </Grid>
        <Grid item lg={4}>
          <Typography fontSize={fontSize}>
            Valor total lote: ${valorTotalLote}
          </Typography>
          <Typography fontSize={fontSize}>
            Valor total Doc. Electronico: ${valorTotalDocumentos}
          </Typography>
        </Grid>
        
        <Grid item lg={12}>
          <Divider>
            <Chip label="OBSERVACIONES" size="small" />
          </Divider>
        </Grid>
        <Grid item sm={12}>
          <TextField fullWidth
            id="standard-textarea"
            label="ESCRIBIR OBSERVACION ..."
            placeholder="Escribir...."
            multiline
            rows={3}
            variant="filled"
            value={observacionLiquidacion}
            InputLabelProps={propsLabe}
            InputProps={propsLabe}
            onChange={(e) => setObservacionLiquidacion(e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <Button fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={funcionConfirm}>GRABAR LIQUIDACION</Button>
        </Grid>
        <Grid item sm={6}>
          <Button fullWidth
            variant="contained"
            startIcon={<CreateNewFolderIcon />}
            onClick={resetComponent}>NUEVA LIQUIDACION</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CabeceraLiquidacionGrabar