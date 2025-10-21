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
        width: '9px',  
    },
}));


const InfoExtractoConfimacion = ({ dataExtractos = [] }) => {
    return (
        <>
            {dataExtractos.length === 0 ? (<Typography>NO EXISTEN EXTRACTO SELECCIONADOS</Typography>):
                (<TableContainer component={Paper} >
                    <Table style={{ margin: '0px 0px 0px 0px' }} >
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#ffe800' }}>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>CUENTA FINANCIERA</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>REFERENCIA</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', padding: '6px', fontSize: '12px' }}>CREDITO</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataExtractos.length > 0 ? (
                                dataExtractos.map((extracto, index) => (
                                    <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }}>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{extracto.cta_financiera}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{extracto.referenceno}</TableCell>
                                        <TableCell style={{ padding: '4px', fontSize: '10px' }}>{extracto.credito}</TableCell>
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

export default InfoExtractoConfimacion