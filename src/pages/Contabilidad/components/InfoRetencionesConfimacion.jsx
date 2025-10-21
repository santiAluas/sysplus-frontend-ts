import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ffe800",
        color: "#171718",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 5,
    },
    '&.customWidth': {
        width: '9px',  // Ajusta el ancho según tus necesidades
    },
}));


const InfoRetencionesConfimacion = ({dataRetenciones = []}) => {
  return (
    <>
    {dataRetenciones.length === 0 ? (<Typography>NO EXISTEN RETENCIONES SELECCIONADOS</Typography>) :
                (<TableContainer component={Paper} >
                    <Table style={{ margin: '0px 0px 0px 0px' }} >
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#ffe800' }}>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>Ruc emisor</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>Renta</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>IVA</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataRetenciones.length > 0 ? (
                                dataRetenciones.map((retencion, index) => (
                                    <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }}>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{retencion.ruc_emisor_tx}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{retencion.renta_nr}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{retencion.iva_nr}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center', color: 'gray', padding: '10px' }}>
                                        No hay datos de facturas disponibles
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>)}
    </>
  )
}

export default InfoRetencionesConfimacion