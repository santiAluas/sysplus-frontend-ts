import { Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const EconomicInformation = ({ info, handleChange, infoINEC,setInfo }) => {
    const handleFieldChange = (fieldName, value) => {
        setInfo(prevInfo => ({
            ...prevInfo,
            informationEconomic: {
                ...prevInfo.informationEconomic,
                expenses: {
                    ...prevInfo.informationEconomic.expenses,
                    [fieldName]: value
                }
            }
        }));
    };

    const handleFieldChangequotaAvailable = (value) => {
        setInfo(prevInfo => ({
            ...prevInfo,
            informationEconomic: {
                ...prevInfo.informationEconomic,
                quotaAvailable:value
            }
        }));
    };

    const handleFieldChangeIncome = (fieldName, value) => {
        setInfo(prevInfo => ({
            ...prevInfo,
            informationEconomic: {
                ...prevInfo.informationEconomic,
                income: {
                    ...prevInfo.informationEconomic.income,
                    [fieldName]: value
                }
            }
        }));
    };

    const handleNumericInputChange = (fieldName, inputValue) => {
        const numericValue = inputValue.replace(/[^0-9.]/g, '');

        if (!isNaN(numericValue)) {
            handleFieldChange(fieldName, numericValue);
        }
    };

    const handleNumericInputChangeIncome = (fieldName, inputValue) => {
        const numericValue = inputValue.replace(/[^0-9.]/g, '');

        if (!isNaN(numericValue)) {
            handleFieldChangeIncome(fieldName, numericValue);
        }
    };

    useEffect(() => {
        const { expenses, income } = info.informationEconomic;

        if (parseInt(expenses.underDependence) === 0 || parseInt(expenses.underDependence).toString() === '0') {
            const newValue = expenses.familyMembers * (infoINEC.alimentosbebidas + infoINEC.vivienda);
            handleFieldChange('underDependence', newValue.toFixed(2));
        }

        if (parseInt(expenses.businessProfit) === 0 || parseInt(expenses.businessProfit).toString() === '0') {
            const newValue = expenses.familyMembers * infoINEC.miscelaneos;
            handleFieldChange('businessProfit', newValue.toFixed(2));
        }

        const totalExpenses = parseFloat(expenses.underDependence || 0) +
                              parseFloat(expenses.businessProfit || 0) +
                              parseFloat(expenses.other || 0);
        handleFieldChange('total', totalExpenses.toFixed(2));

        const totalIncome = parseFloat(income.underDependence || 0) +
                            parseFloat(income.businessProfit || 0) +
                            parseFloat(income.other || 0);
                            handleFieldChangeIncome('total', totalIncome.toFixed(2));
        const quotaAvailable = totalIncome - totalExpenses;
        handleFieldChangequotaAvailable(quotaAvailable.toFixed(2));
    }, [info, infoINEC, handleFieldChange, setInfo]);



    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <Typography fontWeight="bold" variant='h5' component='h2' mb={1}  >Ingresos</Typography>
                    <Grid container alignItems='center' spacing={2}>
                        <Grid item xs={12} lg={4}>
                            Bajo Dependencia ( deudor, conyuge)
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <TextField id="filled-basic"
                                label="VALOR NUMERICO"
                                variant="filled"
                                fullWidth
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.income.underDependence"
                                value={info.informationEconomic.income.underDependence }
                                onChange={(e) => handleNumericInputChangeIncome('underDependence', e.target.value)} />
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            Utilidad Negocio Propio ( deudor, conyuge)
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <TextField id="filled-basic"
                                label="VALOR NUMERICO"
                                variant="filled"
                                fullWidth
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.income.businessProfit"
                                value={info.informationEconomic.income.businessProfit}
                                onChange={(e) => handleNumericInputChangeIncome('businessProfit', e.target.value)} />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            Otros (Jubil, Renta, Giros, etc)
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <TextField id="filled-basic"
                                label="VALOR NUMERICO"
                                variant="filled"
                                fullWidth
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.income.other"
                                value={info.informationEconomic.income.other}
                                onChange={(e) => handleNumericInputChangeIncome('other', e.target.value)} />
                        </Grid>

                        <Grid item xs={12} lg={4}>

                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Typography textAlign='right' fontWeight='bold' variant='h6'>
                                <hr />
                                <hr />
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={4}>
                            TOTAL INGRESOS
                        </Grid>
                        <Grid item xs={4} lg={7}>
                            <Typography textAlign='right' fontWeight='bold' variant='h6'>
                                {info.informationEconomic.income.total}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={6} mt={2}>
                    <Grid container>
                        <Grid item xs={12} lg={3}>
                            <Typography fontWeight="bold"
                                variant='h5'
                                component='h2'
                                mb={1} >GASTOS</Typography>
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <TextField id="filled-basic"
                                label="INTEGRANTES FAMILIARES"
                                variant="filled"
                                fullWidth
                                name="informationEconomic.expenses.familyMembers"
                                 value={info.informationEconomic.expenses.familyMembers}
                                 onChange={(e) => handleNumericInputChange('familyMembers', e.target.value)}/>
                        </Grid>
                        <Grid container alignItems='center' spacing={2} mt={1} >
                            <Grid item xs={12} lg={4}>
                                Alimentación, Vivienda,Indumentaria
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                <TextField id="filled-basic" 
                                label="VALOR NUMERICO" 
                                variant="filled" 
                                fullWidth 
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.expenses.underDependence"
                                value={info.informationEconomic.expenses.underDependence}
                                onChange={(e) => handleNumericInputChange('underDependence', e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                            Miscelaneos
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                <TextField id="filled-basic" 
                                label="VALOR NUMERICO" 
                                variant="filled" 
                                fullWidth 
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.expenses.businessProfit"
                                value={info.informationEconomic.expenses.businessProfit}
                                onChange={(e) => handleNumericInputChange('businessProfit', e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                            Deudas, otros 
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                <TextField id="filled-basic" 
                                label="VALOR NUMERICO" 
                                variant="filled" 
                                fullWidth 
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                name="informationEconomic.expenses.other"
                                value={info.informationEconomic.expenses.other}
                                onChange={(e) => handleNumericInputChange('other', e.target.value)} />
                            </Grid>

                            <Grid item xs={12} lg={4}>

                            </Grid>
                            <Grid item xs={12} lg={7}>
                                <Typography textAlign='right' fontWeight='bold' variant='h6'>
                                    <hr />
                                    <hr />
                                </Typography>
                            </Grid>
                            <Grid item xs={6} lg={4}>
                                TOTAL GASTOS
                            </Grid>
                            <Grid item xs={6} lg={7}>
                                <Typography textAlign='right' fontWeight='bold' variant='h6'>
                                    {info.informationEconomic.expenses.total}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} lg={4}>
                                <hr />
                                <strong>DISPONIBLE PARA LA CUOTA </strong>
                            </Grid>
                            <Grid item xs={6} lg={7}>
                                <hr />
                                <Typography textAlign='right' fontWeight='bold' variant='h6'>
                                {info.informationEconomic.quotaAvailable}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}

export default EconomicInformation