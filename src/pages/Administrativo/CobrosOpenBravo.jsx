import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NavbarMasterMoto from '../../components/NavbarMasterMoto'
import { GET_REVISION_MOTO } from '../../services/Aura_Api'
import { Box, Button, Grid, Paper, Stack, TextField } from '@mui/material'
import SearchBlobal from '../../components/SearchBlobal'
import TextFielCustom from '../../components/TextFielCustom'
import {GENERAR_COBRO_OB} from '../../services/Administrativo_Apis/Api_Administrativo'
import { Decrypt_User } from '../../services/Storage_Service'
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'


const CobrosOpenBravo = () => {

  const OnInitPage = async () => {
    const user = await Decrypt_User();
    if (user === null) {
        return;
    }
    return user
}


  const informacionFacturaEncerrado = {
    "cod_fecha": "",
    "cod_mes": "",
    "cod_compania": "",
    "motc_catven": "",
    "motc_origen": 0,
    "motc_tipo_doc": "",
    "motc_n_documento": "",
    "motc_cod_producto": "",
    "motc_des_producto": "",
    "motc_cod_marca": "",
    "marca_motos": "",
    "motc_cod_fiscal": "",
    "motc_cod_cliente": "",
    "motc_des_cliente": "",
    "motc_clt_ciudad": "",
    "motc_clt_direccion": "",
    "motc_clt_email": "",
    "motc_clt_telefono": "",
    "motc_cod_punto_fact": "",
    "motc_des_punto_fact": "",
    "motc_cod_vendedor": "",
    "motc_des_vendedor": "",
    "motc_unidades": 0,
    "motc_ing_bruto": 0,
    "motc_descuentos": 0,
    "motc_ing_neto": 0,
    "total_factura": 0,
    "motc_costo": 0,
    "motc_ice": "",
    "motc_utilidad": 0,
    "mottran_estado": "",
    "compania_cliente": "",
    "motc_cod_proveedor": "",
    "motc_des_proveedor": "",
    "motc_plazo": 0,
    "cliente_grupo": "",
    "motc_estado_matriculacion": "",
    "motc_estado_fisico": "",
    "motc_politica": "",
    "motc_anio": "",
    "motc_color": "",
    "motc_forma_pago": "",
    "motc_entrada": 0,
    "motc_chasis": "",
    "motc_motor": "",
    "motc_ramv": "",
    "motc_usuario_oracle": "",
    "fecha_venta": "",
    "motc_clt_fecha_nacimiento": "",
    "motc_clt_sexo": "",
    "motc_mpago_cobro": "",
    "motc_tcre_tc": "",
    "motc_banc_emi_tc": ""
  }
  const [factura, setFactura] = useState(informacionFacturaEncerrado)
  const [numeroFactura, setNumeroFactura] = useState("");
  const [valorCobrar, setValorCobrar] = useState(0);

  const functionThatReturnPromise = async () => {
    try {
      const respuesta = await GET_REVISION_MOTO(numeroFactura);
      setFactura(respuesta[0])
    } catch (error) {
      throw error;
    }
  };


  const generarCobroOP = async () =>{
    try {
      const user = await OnInitPage();
      const respuesta = await  GENERAR_COBRO_OB(factura.motc_n_documento, valorCobrar, user.OrganizationId )
    } catch (error) {
      throw error;
    }
  }


  const handleClick = () => {
    confirmAlert({
        title: "Confirmar acción",
        message: "¿Estás seguro de que deseas continuar?",
        buttons: [
            {
                label: "Sí",
                onClick: () => manejoMensajes(generarCobroOP,"SE REALIZO EL COBRO SATISFACTORIAMENTE")
            },
            {
                label: "No",
                // onClick: () => alert("Hiciste clic en No")
            }
        ]
    });
};


  return (
    <>
      <ToastContainer />
      <NavbarMasterMoto titulo="REALIZAR COBROS AL OPEN BRAVO" />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Paper elevation={3}
          style={{
            marginRight: 20,
            marginLeft: 20,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20
          }}>
          <SearchBlobal style={{ width: '100%' }}
            parameterSearch={numeroFactura}
            setParameterSearch={setNumeroFactura}
            functionExecute={functionThatReturnPromise} />
        </Paper>
        <Paper elevation={3}
          style={{
            marginRight: 20,
            marginLeft: 20,
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20
          }}>
          <Grid container spacing={2}>
            <Grid item lg={8} xs={12}>
              <TextFielCustom title="INGRESE LA CANTIDAD DEL COBRO" value={valorCobrar} setValue={setValorCobrar} type='number' />
            </Grid>
            <Grid item lg={4} xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }} >
                <Button variant="contained" size="large" fullWidth onClick={handleClick}>REALIZAR COBRO</Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3}
          style={{
            marginRight: 20,
            marginLeft: 20,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20
          }}>
          <Grid container spacing={2}>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="# FACTURA" value={factura.motc_n_documento} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="NOMBRE DEL CLIENTE" value={factura.motc_des_cliente} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="DOCUMENTO DEL CLIENTE" value={factura.motc_cod_cliente} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="EMAIL" value={factura.motc_clt_email} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="CIUDAD" value={factura.motc_clt_ciudad} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="MODELO PRODUCTO" value={factura.modeloproducto} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="MARCA PRODUCTO" value={factura.motc_cod_marca} enable={false} />
            </Grid>
            <Grid item xs='12' lg='4'>
              <TextFielCustom title="AGENCIA" value={factura.motc_des_punto_fact} enable={false} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}

export default CobrosOpenBravo