import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
const FechasCambiosCajas = ({ dateInit, dateEnd, initDate, endDate }) => {
    return (
        <div style={{ with: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']} >
                    <div style={{ display: 'flex', justifyContent:'left' ,alignItems: 'center', with: '100%', flexWrap: 'wrap' }}>
                        <div  style={{ display: 'flex', 
                                       justifyContent:'center', 
                                       alignItems: 'center', 
                                       with: '100%',
                                       marginTop:"10px" }}>
                            <Typography fontWeight="bold" padding={2}>
                                SELECCIONE FECHA CABECERA ACTUAL
                            </Typography>
                            <DatePicker label="FECHA INICIO"
                                value={initDate}
                                onChange={(newValue) => dateInit(newValue)}
                                format="YYYY-MM-DD"
                                padding={2}
                            />
                        </div>
                        <div style={{ display: 'flex', 
                                      alignItems: 'center', 
                                      with: '100%',
                                      marginTop:"10px" }}>
                            <Typography fontWeight="bold" padding={2}>
                                SELECCIONE FECHA A CAMBIO
                            </Typography>
                            <DatePicker
                                label="FECHA CAMBIO"
                                value={endDate}
                                padding={2}
                                format="YYYY-MM-DD"
                                onChange={(newValue) => dateEnd(newValue)}
                            />
                        </div>

                    </div>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}

export default FechasCambiosCajas