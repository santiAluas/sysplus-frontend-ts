import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const DetailsLimitAndQuota = ({pc_36, pc_30, pc_24, pc_18, title, color}) => {
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
                       <TableCell colSpan={4} sx={{ backgroundColor: color, color: 'white' }} align="center"> {title}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell sx={{ backgroundColor: color, color: 'white' }} align="center">36</TableCell>
                       <TableCell sx={{ backgroundColor: color, color: 'white' }} align="center">30</TableCell>
                       <TableCell sx={{ backgroundColor: color, color: 'white' }} align="center">24</TableCell>
                       <TableCell sx={{ backgroundColor: color, color: 'white' }} align="center">18</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       <TableCell align="center">{pc_36}</TableCell>
                       <TableCell align="center">{pc_30}</TableCell>
                       <TableCell align="center">{pc_24}</TableCell>
                       <TableCell align="center">{pc_18}</TableCell>
                   </TableRow>
               </TableBody>
           </Table>
       </TableContainer>
</>
  )
}

export default DetailsLimitAndQuota