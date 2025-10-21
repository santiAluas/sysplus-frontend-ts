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
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
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


const AgencyAccordionCC = (props) => {

    const { data, dateInit, setDateInit, generateReport } = props
    return (
        <div>
            <Card sx={{ width: '100%', padding: 2 }}>
                <CardHeader sx={{ backgroundColor: '#000000', color: '#333', padding: 1, borderRadius: '8px' }}
                    title="CUMPLIMIENTO POR AGENCIAS" />
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
                    <TableContainer component={Paper}>
                        <Table>
                            {data !== null || data !== undefined ? (<TableBody>
                                {data.map((Agency, index) => (
                                    <React.Fragment key={index}>
                                        <StyledTableRow>
                                            <StyledTableCell colSpan={4}>
                                                <Typography variant="h6" textAlign='center'>-- {Agency.Agency} --</Typography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>Empleados</StyledTableCell>
                                            <StyledTableCell align="right">Prospectos</StyledTableCell>
                                            <StyledTableCell align="right">Solicitudes</StyledTableCell>
                                            <StyledTableCell align="right">Facturas</StyledTableCell>
                                        </StyledTableRow>
                                        {Agency.Users.length > 0 ? (
                                            Agency.Users.map((user, i) => (
                                                <StyledTableRow key={i}>
                                                    <StyledTableCell>{user.Name}</StyledTableCell>
                                                    <StyledTableCell align="right">{user.Prospectos}%</StyledTableCell>
                                                    <StyledTableCell align="right">{user.Solicitudes}%</StyledTableCell>
                                                    <StyledTableCell align="right">{user.Facturas}%</StyledTableCell>
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
                                ))}
                            </TableBody>) : null}

                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

        </div>
    );
};

export default AgencyAccordionCC;
