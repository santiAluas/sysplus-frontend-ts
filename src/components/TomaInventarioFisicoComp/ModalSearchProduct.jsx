import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, Button, Stack } from '@mui/material';
import { SEARCH_PRODUCTO_INVENTORY } from '../../services/Api_Inventario/Api_TomaFisicaInventario'
import './css/ModalSearchProductCss.css'
import ecuador from '../../assets/images/ecuador.png'
import oficinaencasa from '../../assets/images/oficinaencasa.png'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};


const ModalSearchProduct = ({ openModal, setOpen, setProduct, parameterSearch, agencia, setLocationItem , resetdata}) => {

    const [typeStore, setTypeStore] = useState("none")
    const [listaProducto, setListaProductos] = useState([])

    const searchProduct = async () => {
        let respuesta = await SEARCH_PRODUCTO_INVENTORY(parameterSearch, agencia, 'true');
        setTypeStore("LOCAL")
        setLocationItem("LOCAL")
        if (respuesta.length === 0) {
            respuesta = await SEARCH_PRODUCTO_INVENTORY(parameterSearch, agencia, 'false');
            setTypeStore("NACIONAL")
            setLocationItem("NACIONAL")
        }
        setListaProductos(respuesta)
    }

    const handleClose = () => setOpen(false);


    useEffect(() => {
        const fetchData = async () => {
            await searchProduct();
        };

        if (parameterSearch !== "" && agencia !== "") {
            fetchData();
        }
    }, [parameterSearch]);

    const selectProduct = (item) => {
        resetdata()
        setProduct(item)
        setOpen(false)

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

                        <img
                            src={typeStore === "LOCAL" ? oficinaencasa : ecuador}
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
                            {typeStore === "LOCAL" ? "SELECCIONE EL PRODUCTO DE SU LOCAL" : "SELECCIONE EL PRODUCTO A NIVEL NACIONAL"}
                        </Typography>
                    </Stack>
                    <div style={{ overflowY: 'auto', maxHeight: '520px', position: 'relative' }}>
                        <table style={{ width: '100%', border: '2', textAlign: 'center' }}>
                            <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: '#fff', textAlign: 'center' }}>
                                <tr className='tableheader'>
                                    <th style={{ display: 'none' }}>ID</th>
                                    <th>CODIGO</th>
                                    <th>NOMBRE</th>
                                    <th>COLOR</th>
                                    <th>CHASIS</th>
                                    <th>MOTOR</th>
                                    {/* {typeStore === "NACIONAL" ? */}
                                        <th>AGENCIA</th>
                                        {/* :
                                        null
                                    } */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaProducto.length > 0 ?
                                        listaProducto.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ display: 'none' }}>{item.id}</td>
                                                    <td style={{ fontSize: '5' }}>{item.codigo}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.atributo1 === "0" ? "" : item.atributo1}</td>
                                                    <td>{item.atributo2 === "0" ? "" : item.atributo2}</td>
                                                    <td>{item.atributo3 === "0" ? "" : item.atributo3}</td>
                                                    {/* {typeStore === "NACIONAL" ? */}
                                                        <td>{item.almacen}</td>
                                                    {/* //     :
                                                    //     null
                                                    // } */}
                                                    <td>
                                                        <Button variant="outlined" color="success" sx={{ width: '100%' }} onClick={(e) => selectProduct(item)} > SELECCIONAR</Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :   null
                                }
                            </tbody>
                        </table>
                        {listaProducto.length > 0 ? null: <Alert severity="warning">NO SE ENCONTRARON RESULTADOS.</Alert>}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalSearchProduct