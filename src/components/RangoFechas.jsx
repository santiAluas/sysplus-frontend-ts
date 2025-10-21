import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
const RangoFechas = ({ setDateInit, setDateEnd, dateInit, dateEnd }) => {
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
                                SELECCIONE FECHA INICIO
                            </Typography>
                            <DatePicker label="FECHA INICIO"
                                value={dateInit}
                                onChange={(newValue) => setDateInit(newValue)}
                                format="YYYY-MM-DD"
                                padding={2}
                            />
                        </div>
                        <div style={{ display: 'flex', 
                                      alignItems: 'center', 
                                      with: '100%',
                                      marginTop:"10px" }}>
                            <Typography fontWeight="bold" padding={2}>
                                SELECCIONE FECHA FINAL
                            </Typography>
                            <DatePicker
                                label="FECHA CAMBIO"
                                value={dateEnd}
                                padding={2}
                                format="YYYY-MM-DD"
                                onChange={(newValue) => setDateEnd(newValue)}
                            />
                        </div>
                    </div>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}

export default RangoFechas