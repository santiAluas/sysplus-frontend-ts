
import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useEffect } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
};
const ModalConfirmacionFinalizar = ({ open, 
                                      setOpen, 
                                      titulo, 
                                      mensaje, 
                                      setConfirmacion, 
                                      agencuasUsuarios,
                                      seleccionarAgencia,
                                      setSeleccionarAgencia,
                                      seleccionarAgenciaActual }) => {

    const handleClose = () => {
        setOpen(false)
        setConfirmacion("NO")
    };

    useEffect( () => {
        setSeleccionarAgencia(seleccionarAgenciaActual)
    },[seleccionarAgenciaActual,setSeleccionarAgencia])
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
                        {titulo}
                    </Typography>
                    <Typography id="modal-modal-description" textAlign='center' sx={{ mt: 2 }}>
                        {mensaje}
                    </Typography>
                    <Stack direction='row'
                        justifyContent='center'
                        alignItems='center'
                        mt={3}>
                        <span style={{ fontWeight: 'bold' }}>AGENCIA:</span>
                        <FormControl sx={{ marginLeft: 5, width: 140 }} >
                            <InputLabel id="demo-simple-select-label">AGENCIA</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={seleccionarAgencia}
                                onChange={(e) => setSeleccionarAgencia(e.target.value)}
                            >
                                <MenuItem value={0}>-- SELECT --</MenuItem>
                                {agencuasUsuarios.map(item => {
                                    return <MenuItem value={item.id}>{item.agencia}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        flexWrap='wrap'
                        spacing={2}
                        mt={2}>
                        <Button variant="outlined" color="success" sx={{ width: '90%' }} onClick={(e) => setConfirmacion("FINALIZAR")}>FINALIZAR</Button>

                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default ModalConfirmacionFinalizar

