import { Divider, Grid, Stack, TextField } from '@mui/material'
import React from 'react'

const CustomerClient = ({ number, info, handleChange }) => {

    function generateFieldName(number, attribute) {
        switch (number) {
            case 1:
                return `referenceClient.referenceClientOne.${attribute}`;
            case 2:
                return `referenceClient.referenceClientTwo.${attribute}`;
            default:
                return `referenceClient.referenceClientThree.${attribute}`;
        }
    }

    function generateFieldValue(number, info, attribute) {
        switch (number) {
            case 1:
                return info.referenceClient.referenceClientOne[attribute];
            case 2:
                return info.referenceClient.referenceClientTwo[attribute];
            default:
                return info.referenceClient.referenceClientThree[attribute];
        }
    }
    return (
        <>
            <Divider>REFERENCIA {number}</Divider>
            <Grid container m={2}>
                <Grid item sx={3} lg={3}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        <TextField id="filled-basic"
                            label="NOMBRE"
                            variant="filled"
                            sx={{ width: '80%' }}
                            name={generateFieldName(number,"name")}
                            value={generateFieldValue(number, info, "name")}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>
                <Grid item sx={3} lg={3}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        <TextField id="filled-basic" 
                                   label="PARENTEZCO" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name={generateFieldName(number,"relationShip")}
                                   value={generateFieldValue(number, info, "relationShip")}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
                <Grid item sx={3} lg={3}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        <TextField id="filled-basic" 
                                   label="DIRECCION" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name={generateFieldName(number,"address")}
                                   value={generateFieldValue(number, info, "address")}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
                <Grid item sx={3} lg={3}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        <TextField id="filled-basic" 
                                   label="TELEFONO" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name={generateFieldName(number,"phone")}
                                   value={generateFieldValue(number, info, "phone")}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default CustomerClient