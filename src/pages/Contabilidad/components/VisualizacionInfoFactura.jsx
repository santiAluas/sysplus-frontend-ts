import React, { useState, useEffect, useRef } from 'react';
import { Chip, Grid, TextField, Divider } from '@mui/material';
import Factura from '../class/Facturaencerrado';
import LabelInfo from './LabelInfo';

const VisualizacionInfoFactura = ({ Item = Factura, index = '', actualizarTotalLiquidar, esNuevo = false }) => {
  const [totalLiquidar, setTotalLiquidar] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const initializedFacturaId = useRef(null);

  useEffect(() => {
    if (Item.id !== initializedFacturaId.current) {
      const saldo = parseFloat(Item.saldo_total ?? 0);
      const total = parseFloat(Item.total ?? 0);
      const valorInicial = saldo > 0 ? saldo : total;

      setTotalLiquidar(String(Item.totalLiquidar ?? valorInicial));
      initializedFacturaId.current = Item.id;
    }
  }, [Item.id]);

  const handleChange = (event) => {
    setTotalLiquidar(event.target.value);
  };

  const handleBlur = () => {
    const input = totalLiquidar;
    const maximoPermitido = parseFloat(Item.saldo_total ?? 0) > 0 
      ? parseFloat(Item.saldo_total) 
      : parseFloat(Item.total);

    if (input === '' || input === '.' || input === ',') {
      setError(true);
      setHelperText('Debe ingresar un valor');
      return;
    }

    const numericValue = parseFloat(input.replace(',', '.'));

    if (isNaN(numericValue)) {
      setError(true);
      setHelperText('Debe ser un número válido');
      return;
    }

    if (numericValue <= 0) {
      setError(true);
      setHelperText('El valor debe ser mayor a 0');
      return;
    }

    if (numericValue > maximoPermitido) {
      setError(true);
      setHelperText(`No puede ser mayor que ${maximoPermitido}`);
      return;
    }

    setError(false);
    setHelperText('');

    if (actualizarTotalLiquidar) {
      actualizarTotalLiquidar(Item.id, numericValue);
    }
  };

  return (
    <div style={{ paddingTop: '5px', paddingBottom: '15px' }}>
      <Divider
        textAlign="left"
        sx={{
          "&::before, &::after": {
            borderColor: "#eeeae9",
            borderWidth: "2px",
          },
        }}
      >
        <Chip label={`FACTURA #${index}`} size="small" />
      </Divider>
      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <LabelInfo title="FACTURA PROVEEDOR: " information={Item.fact_proveedor} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <LabelInfo title="DNI Proveedor: " information={Item.id_proveedor} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <LabelInfo title="Proveedor Total: " information={Item.totlinea} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <LabelInfo title="Total: " information={parseFloat(Item.total ?? 0)} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <LabelInfo 
            title="Saldo Total: " 
            information={parseFloat(Item.saldo_total ?? 0) > 0 ? Item.saldo_total : Item.total} 
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <LabelInfo title="Proveedor: " information={Item.proveedor} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField
            label="Factura a Liquidar:"
            value={totalLiquidar}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            disabled={!esNuevo} // Deshabilita el campo si no es una nueva factura
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VisualizacionInfoFactura;
