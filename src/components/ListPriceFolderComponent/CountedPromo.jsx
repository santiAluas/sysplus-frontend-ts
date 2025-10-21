import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CountedPromo = ({dctoMax, newPOE, title}) => {
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
                       <TableCell colSpan={4} sx={{ backgroundColor: '#9690e9', color: 'white' }} align="center"> {title}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell sx={{ backgroundColor: '#9690e9', color: 'white' }} align="center">DCTO. MAX</TableCell>
                       <TableCell sx={{ backgroundColor: '#9690e9', color: 'white' }} align="center">NUEVO POE</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       <TableCell align="center">{dctoMax}</TableCell>
                       <TableCell align="center">{newPOE}</TableCell>
                   </TableRow>
               </TableBody>
           </Table>
       </TableContainer>
</>
  )
}

export default CountedPromo