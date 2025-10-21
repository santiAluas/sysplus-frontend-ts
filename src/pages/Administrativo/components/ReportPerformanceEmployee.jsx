import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardHeader,
    tableCellClasses,
    CardContent,
    Button,
    Tabs,
    Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    '&.customWidth': {
        width: '12px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));


const ReportPerformanceEmployee = (props) => {
    const { data, dateInit, setDateInit, generateReport, tabValue, setTabValue, orderByType, setOrderByType } = props

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const stylerows = (value) => {
        return {
          backgroundColor: value >= 70 ? '#77DD77' : value >= 50 ? '#FDFD96' : '#FF6961',
          color: 'black'
        };
      };
    return (
        <>
            <Card sx={{ width: '100%', padding: 2 }}>
                <CardHeader sx={{ backgroundColor: '#000000', color: '#333', padding: 1, borderRadius: '8px' }}
                    title="CUMPLIMIENTO GENERAL POR EMPLEADO" />
                <CardContent>
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
                        <Tab label={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography>SOLICITUDES</Typography>
                                {tabValue === 0 ? (orderByType ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />) : null}

                            </div>
                        }
                            onClick={generateReport} />
                        <Tab label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>PROSPECTOS</Typography>
                                {tabValue === 1 ? orderByType ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" /> : null}
                            </div>
                        }
                            onClick={generateReport} />
                        <Tab label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>FACTURAS</Typography>
                                {tabValue === 2 ? orderByType ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" /> : null}
                            </div>
                        }
                            onClick={generateReport} />
                    </Tabs>
                    <TableContainer component={Paper}>
                        <Table>
                            {data !== null || data !== undefined ? (<TableBody>
                                <React.Fragment >
                                    <StyledTableRow >
                                        <StyledTableCell align="right">EMPLEADO</StyledTableCell>
                                        <StyledTableCell align="right">AGENCIA</StyledTableCell>
                                        <StyledTableCell align="right">VALOR</StyledTableCell>
                                    </StyledTableRow>
                                    {data.length > 0 ? (
                                        data.map((user, i) => (
                                            <StyledTableRow key={i} >
                                                <StyledTableCell align="right" >{user.usuario_ob}</StyledTableCell>
                                                <StyledTableCell align="right" >{user.agencia}</StyledTableCell>
                                                <StyledTableCell align="right" style={stylerows(user.valor)}>{user.valor}%</StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    ) : (
                                        <StyledTableRow>
                                            <StyledTableCell colSpan={4} align="center" >
                                                <Typography variant="h6" textAlign='center'>No hay datos disponibles.</Typography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )}
                                </React.Fragment>
                            </TableBody>) : null}

                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

        </>
    )
}

export default ReportPerformanceEmployee