import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {  Button, Stack } from '@mui/material';
// import './../css/ModalSearchProductCss.css'
import ecuador from '../../assets/images/ecuador.png'
import oficinaencasa from '../../assets/images/oficinaencasa.png'
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
const ModalSelectProductNational = ({openModal, setOpen}) => {
  const handleClose = () => setOpen(false);
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

                        <img
                            src= {ecuador}
                            alt="logo Ecuador"
                            loading="lazy"
                            width='50px'
                            className=' text parpadeaText'
                        />

                        <Typography textAlign='center'
                            className=' text parpadeaText'
                            id="modal-modal-title"
                            variant="h4"
                            component="h2">
                             "SELECCIONE EL PRODUCTO A NIVEL NACIONAL"
                        </Typography>
                    </Stack>
                    <div style={{ overflowY: 'auto', maxHeight: '520px', position: 'relative' }}>
                        <table style={{ width: '100%', border: '2', textAlign: 'center' }}>
                            <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: '#fff', textAlign: 'center' }}>
                                <tr className='tableheader'>
                                    <th>NOMBRE</th>
                                    <th>MOTOR</th>
                                    <th>CHASIS</th>
                                    <th>AGENCIA</th>
                                    <th>ACCION</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr >
                                        <td>DATYRONA X-POWER</td>
                                        <td>ASDF-ASDF3</td>
                                        <td>ASDF-ASDF3</td>
                                        <td>GRAN COLOMBIA</td>
                                        <td>
                                            <Button variant="outlined" color="success" sx={{ width: '100%' }} > SELECCIONAR</Button>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>DATYRONA X-POWER</td>
                                        <td>ASDF-ASDF3</td>
                                        <td>ASDF-ASDF3</td>
                                        <td>ESTADIO</td>
                                        <td>
                                            <Button variant="outlined" color="success" sx={{ width: '100%' }} onClick={(e) => setOpen(false)} > SELECCIONAR</Button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </Box>
            </Modal>
        </>
  )
}

export default ModalSelectProductNational