import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export const SixMothPlaceLimit = ({item}) => {
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
                            <TableCell colSpan={4} sx={{ backgroundColor: '#2e1437', color: 'white' }} align="center"> 6 MESES SIN INTERESES</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#2e1437', color: 'white' }} align="center">PVP</TableCell>
                            <TableCell sx={{ backgroundColor: '#2e1437', color: 'white' }} align="center">ENTRADA</TableCell>
                            <TableCell sx={{ backgroundColor: '#2e1437', color: 'white' }} align="center">PLAZO</TableCell>
                            <TableCell sx={{ backgroundColor: '#2e1437', color: 'white' }} align="center">CUOTA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{item.pvp_6meses}</TableCell>
                            <TableCell align="center">{item.entrada_6meses}</TableCell>
                            <TableCell align="center">{item.plazo_6meses}</TableCell>
                            <TableCell align="center">{item.couta_6meses}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  )
}
