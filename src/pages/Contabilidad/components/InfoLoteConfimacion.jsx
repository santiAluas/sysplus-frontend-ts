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

const InfoLoteConfimacion = ({dataLotes = []}) => {
  return (
    <>
     {dataLotes.length === 0 ? (<Typography>NO EXISTEN LOTES SELECCIONADOS</Typography>):
                (<TableContainer component={Paper} >
                    <Table style={{ margin: '0px 0px 0px 0px' }} >
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#ffe800' }}>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '11px' }}>LOTE</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '11px' }}>RECAP</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '11px' }}>USUARIO</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataLotes.length > 0 ? (
                                dataLotes.map((lote, index) => (
                                    <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }}>
                                        <TableCell style={{ padding: '4px', fontSize: '9px' }}>{lote.lote}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '9px' }}>{lote.recap}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '9px' }}>{lote.usuario1}</TableCell>
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

export default InfoLoteConfimacion