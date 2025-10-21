import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Divider, Grid, Typography } from '@mui/material';
import SearchBlobal from '../../components/SearchBlobal';
const AprovveTransfer = () => {
  return (
    <>
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: '100%',
                height: '100%',
            },
        }}
    >
        <Paper elevation={3} >
            <Typography variant="h5" component="h5" textAlign='center'>
                PROBAR TRASPASO MOTOS
            </Typography>
            <Grid container spacing={3} padding={3}>
                <Grid item sx={12} lg={12}>
                    <SearchBlobal />
                </Grid>
                <Grid item sx={12} lg={12}>
                    <Divider variant="inset" />
                </Grid>

                <Grid item sx={12} lg={12}>
                    <table style={{ width: '100%', border: '2', textAlign: 'center' }}>
                        <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: '#fff', textAlign: 'center' }}>
                            <tr className='tableheader'>
                                <th>NOMBRE</th>
                                <th>MOTOR</th>
                                <th>CHASIS</th>
                                <th>AGENCIA</th>
                                <th>TRASPASO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td > DAYTONA X POWER 250 </td>
                                <td style={{ fontSize: '5' }}> SADF45-ASD1F3 </td>
                                <td> ERPOP 12314 </td>
                                <td>  SHYRIS </td>
                                <td>
                                    <Button variant="outlined" color="success" sx={{ width: '100%' }} > PROBAR</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </Paper>
    </Box>

</>
  )
}

export default AprovveTransfer