import { Button, Paper, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../helpers/ManejoExcepciones.js'
import {RENEW_ALL_IMAGE} from '../services/apiCobrax.js'
const PagesCobrax = () => {
    const [dni, setDni] = useState("")
    const [codDocument, setCodDocument] = useState("")

   
    const renew_documentAll = () => {
        if (dni.trim() === ""  || codDocument.trim() === "" ) {
            return toast.warn("LOS VALORES DE CEDULA Y CODIGO DE DOCUMENTO NO PUEDEN ESTAR VACIOS.", { position: toast.POSITION.TOP_CENTER })
        }
        const functionThatReturnPromise = async () => {
          try {
            await RENEW_ALL_IMAGE(dni,codDocument);
          } catch (error) {
            throw error;
          }
        };
        manejoMensajes(functionThatReturnPromise, "SE RE GENERO EL ALL IMAGEN CORRECTAMENTE ....")
      }

    return (
        <>
            <ToastContainer />
            <NavbarMasterMoto titulo="FUNCIONES APP COBRAX" />
            <Paper elevation={3}
                style={{
                    marginTop: 10,
                    marginRight: 20,
                    marginLeft: 20,
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20
                }}>
                <Stack spacing={{ xs: 2, sm: 2 }} justifyContent="center" alignItems="center" direction="row">
                    <div style={{ width: '45%' }}>
                        <p>CODIGO COMPROBANTE</p>
                        <TextField id="filled-basic" 
                                   label="CODIGO COMPROBANTE" 
                                   variant="filled"
                                   value={codDocument} 
                                   onChange={(e) => setCodDocument(e.target.value)}
                                   fullWidth />
                    </div>
                    <div style={{ width: '45%' }}>
                        <p>CEDULA CLIENTE</p>
                        <TextField id="filled-basic" 
                                   label="CEDULA CLIENTE" 
                                   variant="filled" 
                                   value={dni} 
                                   onChange={(e) => setDni(e.target.value)}
                                   fullWidth />
                    </div>
                    <div >
                        <Button style={{marginTop: 60}} 
                                variant="contained"
                                onClick={renew_documentAll}>REGENERAR</Button>
                    </div>
                </Stack>
            </Paper>
        </>
    )
}

export default PagesCobrax