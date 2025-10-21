import React from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, Box, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// const data = [
//   { name: '2015 Q1', value: 43 },
//   { name: '2015 Q2', value: 31 },
//   { name: '2015 Q3', value: 29 },
//   { name: '2015 Q4', value: 68 },
//   { name: '2016 Q1', value: 78 },
//   { name: '2016 Q2', value: 47 },
//   { name: '2016 Q3', value: 63 },
//   { name: 'QTD', value: 54 },
// ];

const QuarterlyTeamPerformanceCC = (props) => {
    const { data, dateInit, setDateInit, generateReport, setTypeRepportBar } = props
    const [tabValue, setTabValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                title="RENDIMIENTO DEL CUMPLIMIENTO POR AGENCIA"
                sx={{ backgroundColor: '#000000', padding: 1 }}
            />
            <CardContent >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']} >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            with: '100%',
                            marginTop: "10px"
                        }}>
                            <Typography fontWeight="bold" padding={2}>
                                FECHA BUSQUEDA
                            </Typography>
                            <DatePicker label="FECHA"
                                value={dateInit}
                                onChange={(newValue) => setDateInit(newValue)}
                                format="YYYY-MM-DD"
                                padding={2}
                            />
                        </div>
                        <Button variant="contained" onClick={generateReport}>GENERAR</Button>
                    </DemoContainer>
                </LocalizationProvider >
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" textColor="secundary" indicatorColor="primary">
                    <Tab label="SOLICITUDES" onClick={(e)=>setTypeRepportBar("SCC")} />
                    <Tab label="PROSPECTOS" onClick={(e)=>setTypeRepportBar("PCC")}/>
                    <Tab label="FACTURAS" onClick={(e)=>setTypeRepportBar("FCC")}/>
                </Tabs>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />  {/* Color de las líneas y números en el eje X */}
                            <YAxis stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" style={{ color: '#ffe800' }} color='#ffe800' />
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="AGENCIAS" stroke="#ffe800" color='#ffe800' />
                            </LineChart>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuarterlyTeamPerformanceCC;
