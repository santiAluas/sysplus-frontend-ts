import React, { useState, useEffect } from 'react';
import { Chip, Grid, Divider, TextField } from '@mui/material';
import LabelInfo from './LabelInfo';
import Retencion from '../class/RetencionEncerrado';

const VizualizarInfoRetencion = ({ Item = Retencion, index = '', onUpdateField, esNuevo = false }) => {
  const totalRenta = parseFloat(Item.renta_nr) || 0;
  const totalIva = parseFloat(Item.iva_nr) || 0;

  // Ajustar saldo real según si es nuevo o no
 
const valorOcupadoRenta = esNuevo
  ? parseFloat(Item.renta_nr - Item.saldo_renta_nr || 0) 
  : parseFloat(Item.saldo_renta_nr || 0);        

const saldoRenta = totalRenta - valorOcupadoRenta;

const valorOcupadoIva  = esNuevo
  ? parseFloat(Item.iva_nr - Item.saldo_iva_nr || 0)             
  : parseFloat(Item.saldo_iva_nr || 0);            

const saldoIva = totalIva - valorOcupadoIva;

  // Inicialización de valores para liquidar
  const rentaOriginal = saldoRenta;
  const ivaOriginal = saldoIva;

  const [renta, setRenta] = useState(String(Item.renta_liquidar ?? rentaOriginal ?? ''));
  const [rentaError, setRentaError] = useState(false);
  const [rentaHelper, setRentaHelper] = useState('');

  const [iva, setIva] = useState(String(Item.iva_liquidar ?? ivaOriginal ?? ''));
  const [ivaError, setIvaError] = useState(false);
  const [ivaHelper, setIvaHelper] = useState('');

  useEffect(() => {
    setRenta(String(Item.renta_liquidar ?? rentaOriginal ?? ''));
    setIva(String(Item.iva_liquidar ?? ivaOriginal ?? ''));

  }, [Item]);

  const validateAndUpdate = (value, original, setError, setHelper, key) => {
    if (value === '' || value === '.' || value === ',') {
      setError(true);
      setHelper('Debe ingresar un valor');
      return;
    }

    const numericValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numericValue)) {
      setError(true);
      setHelper('Debe ser un número válido');
      return;
    }

if (numericValue < 0 || (numericValue === 0 && parseFloat(original) !== 0)) {
  setError(true);
  setHelper('El valor debe ser mayor a 0');
  return;
}

    if (numericValue > parseFloat(original)) {
      setError(true);
      setHelper(`No puede ser mayor que ${original}`);
      return;
    }

    setError(false);
    setHelper('');

    if (onUpdateField) {
      onUpdateField(Item.id, key, numericValue);
    }
  };

  return (
    <div>
      <Divider
        textAlign="left"
        sx={{
          "&::before, &::after": {
            borderColor: "#eeeae9",
            borderWidth: "2px",
          },
        }}
      >
        <Chip label={`RETENCIÓN #${index}`} size="small" />
      </Divider>

      <Grid container spacing={2}>
        <Grid item lg={4}>
          <LabelInfo title="RUC EMISOR:" information={Item.ruc_emisor_tx} />
        </Grid>
        <Grid item lg={4}>
          <LabelInfo title="RAZÓN SOCIAL:" information={Item.razon_social_emisor_tx} />
        </Grid>

        <Grid item lg={4}>
          <LabelInfo title="SERIE COMPROBANTE:" information={Item.serie_comprobante_tx} />
        </Grid>
        {/* Renta */}
        <Grid item lg={4}>
          <LabelInfo title="RENTA TOTAL:" information={totalRenta.toFixed(2)} />
        </Grid>
        <Grid item lg={4}>
          <LabelInfo title="SALDO RENTA:" information={saldoRenta.toFixed(2)} />
        </Grid>
        <Grid item lg={4}>
          <LabelInfo title="VALOR OCUPADO RENTA:" information={valorOcupadoRenta.toFixed(2)} />
        </Grid>

        {/* IVA */}
        <Grid item lg={4}>
          <LabelInfo title="IVA TOTAL:" information={totalIva.toFixed(2)} />
        </Grid>
        <Grid item lg={4}>
          <LabelInfo title="SALDO IVA:" information={saldoIva.toFixed(2)} />
        </Grid>
        <Grid item lg={4}>
          <LabelInfo title="VALOR OCUPADO IVA:" information={valorOcupadoIva.toFixed(2)} />
        </Grid>



        {/* Inputs solo si es nuevo */}
        <Grid item lg={4}>
          {esNuevo ? (
            <TextField
              label="RENTA A LIQUIDAR"
              value={renta}
              onChange={(e) => setRenta(e.target.value)}
              onBlur={() =>
                validateAndUpdate(
                  renta,
                  rentaOriginal,
                  setRentaError,
                  setRentaHelper,
                  'renta_liquidar'
                )
              }
              error={rentaError}
              helperText={rentaHelper}
              fullWidth
              size="small"
            />
          ) : (
             Item.renta_liquidar ? (
      <LabelInfo title="VALOR OCUPADO RENTA" information={Item.renta_liquidar} />
    ) : null
          )}
        </Grid>

        <Grid item lg={4}>
          {esNuevo ? (
            <TextField
              label="IVA A LIQUIDAR"
              value={iva}
              onChange={(e) => setIva(e.target.value)}
              onBlur={() =>
                validateAndUpdate(
                  iva,
                  ivaOriginal,
                  setIvaError,
                  setIvaHelper,
                  'iva_liquidar'
                )
              }
              error={ivaError}
              helperText={ivaHelper}
              fullWidth
              size="small"
            />
          ) : (

             Item.iva_liquidar ? (
      <LabelInfo title="VALOR OCUPADO IVA" information={Item.iva_liquidar} />
    ) : null
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default VizualizarInfoRetencion;