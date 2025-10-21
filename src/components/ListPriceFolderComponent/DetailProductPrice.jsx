import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DetailProductPrice = ({item}) => {
    return (
        <>
            <TableContainer sx={{
                width: '100%',
                borderRadius: 2,
                border: 1,
            }}>
                <Table sx={{
                    minWidth: 650, borderCollapse: "collapse", marginTop: 0,
                    borderStyle: "hidden",
                    "& td": {
                        border: 1
                    }
                }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">MARCA</TableCell>
                            <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">CODIGO</TableCell>
                            <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">DESCRIPCION</TableCell>
                            <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">POE</TableCell>
                            <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">ENTRADA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{item.marca}</TableCell>
                            <TableCell align="center">{item.codigo}</TableCell>
                            <TableCell align="center">{item.descripcion}</TableCell>
                            <TableCell align="center">{item.poe}</TableCell>
                            <TableCell align="center">{item.entrada}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DetailProductPrice