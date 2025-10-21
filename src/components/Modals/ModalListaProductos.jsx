import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
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
const ModalListaProductos = ({ open, setOpen, titulo, listaProducto, productoSeleccionado, productoencerrado, setCodigoProducto, resetComponentes, buscarProducto,setUbicacionProducto }) => {
    const handleClose = () => setOpen(false);
    const seleccionarProducto = (item) => {
        
        // productoSeleccionado(productoencerrado)
        // productoSeleccionado(item)
        setUbicacionProducto(item.ubicacion)
        setCodigoProducto(item.codigo)
        buscarProducto("nrp",item.codigo, item.ubicacion)
        resetComponentes(false)
        setOpen(false)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography textAlign='center'
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        {titulo}
                    </Typography>
                    <div style={{ overflowY: 'auto', maxHeight: '520px', position: 'relative' }}>
                        <table style={{ width: '100%', border: '2', textAlign: 'center' }}>
                            <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: '#fff' }}>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>DESCRIPCION</th>
                                    <th>MOTOR</th>
                                    <th>CHASIS</th>
                                    <th>UBICACION</th>
                                    <th>ATRIBUTO</th>
                                    <th>ACCION</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    listaProducto.length > 0 ?
                                        listaProducto.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ fontSize: '5' }}>{item.codigo}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>{item.motor}</td>
                                                    <td>{item.chasis}</td>
                                                    <td>{item.ubicacion}</td>
                                                    <td>{item.atributos}</td>
                                                    <td>
                                                        <Button variant="outlined" color="success" sx={{ width: '100%' }} onClick={(e) => seleccionarProducto(item)}> seleccionar</Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : ""

                                }

                            </tbody>
                        </table>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalListaProductos