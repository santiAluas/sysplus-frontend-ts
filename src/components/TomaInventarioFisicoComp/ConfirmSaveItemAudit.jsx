import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Grid, Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import {SAVE_PRODUCT_INVENTORY} from '../../services/Api_Inventario/Api_TomaFisicaInventario.js'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

function getMensajeAguaBateria(valor) {
    const mensajes = {
        1: "SI TIENE",
        2: "FALTANTE",
        3: "Dañado-Roto",
        4: "NO APLICA",
    };

    return mensajes[valor] || "VALOR DESCONOCIDO";
}


const valuesNull = ["N/A","0","","null"]
const ConfirmSaveItemAudit = ({ openModal, setOpen, productSave,resetdata }) => {
    const handleClose = () => setOpen(false);

    const saveProductInv = async () =>{
        const functionThatReturnPromise = async () => {
            try {
                await SAVE_PRODUCT_INVENTORY(productSave)
                resetdata()
                setOpen(false)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "SE GRABO CORRECTAMENTE")
    }


    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Stack direction='row'
                        justifyContent='center'
                        alignItems='center'>

                        <Typography textAlign='center'
                            id="modal-modal-title"
                            variant="h5"
                            component="h2">
                            VERIFICADOR DATOS PARA GRABAR
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography>
                            <strong>CODIGO PRODUCTO: </strong> {productSave.codigoProducto}
                        </Typography>
                        <Typography>
                            <strong>NOMBRE PRODUCTO: </strong> {productSave.nombreProducto}
                        </Typography>
                        <Typography>
                            <strong>CANTIDAD BUEN ESTADO: </strong> {productSave.cantidadBuenEstado}
                        </Typography>
                        <Typography>
                            <strong>CANTIDAD MAL ESTADO: </strong> {productSave.cantidadMalEstado}
                        </Typography>
                        <Typography sx={{display: productSave.isConsignado === 0 ? 'none': 'block'}}>
                            <strong>EL PRODUCTO ES: </strong> {productSave.isConsignado === 1 ? "CONSIGNADO" : "PROPIO"}
                        </Typography>
                    </Stack>

                    <div style={{display: (!valuesNull.includes(productSave.motor) ? 'block' : 'none')}}>
                        <Typography variant="h5" align='center'> kit Moto </Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography>
                                    <strong>LLAVES: </strong> {getMensajeAguaBateria(productSave.llaves)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>MANUAL: </strong> {getMensajeAguaBateria(productSave.manual)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>BATERIA: </strong> {getMensajeAguaBateria(productSave.tieneBateria)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>HERRAMIENTAS: </strong> {getMensajeAguaBateria(productSave.herramientas)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>RETROVISORES: </strong> {getMensajeAguaBateria(productSave.retrovisores)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>APOYA PIES: </strong> {getMensajeAguaBateria(productSave.apoyapies)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>APOYA PLACA: </strong> {getMensajeAguaBateria(productSave.portaplacas)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>APOYA MALETERO: </strong> {getMensajeAguaBateria(productSave.portamaleteros)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <strong>AGUA BATERIA: </strong> {getMensajeAguaBateria(productSave.aguaBateria)}
                                </Typography>
                            </Grid>

                        </Grid>
                    </div>
                    <div>
                        <Typography variant="h5" align='center'> Observaciones</Typography>
                    </div>
                    <Typography align='center'>
                        <strong>{productSave.observaciones === "" ? "SIN OBSERVACIONES" : productSave.observaciones.trim()}</strong>
                    </Typography>
                    <Button variant="contained" onClick={saveProductInv} fullWidth>GRABAR PRODUCTO</Button>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmSaveItemAudit