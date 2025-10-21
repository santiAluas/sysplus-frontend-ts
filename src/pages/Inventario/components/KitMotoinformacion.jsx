import React from 'react'
import {
    Divider, FormControl, FormControlLabel,
    FormLabel, Grid,
    Paper,
    Radio, RadioGroup, Stack
} from '@mui/material'
import { SelectSINO } from '../../../components/AuditoriaStock/SelectSINO'

const KitMotoinformacion = (setIsConsignado,
    isConsignado,
    setSelectedKitMoto,
    selectedKitMoto,
    setllaves,
    llaves,
    setmanual,
    manual,
    setherramientas,
    herramientas,
    setretrovisores,
    retrovisores,
    setapoyaPies,
    apoyaPies,
    baterias,
    setportaPlacas,
    portaPlacas,
    setportaMaleteros,
    portaMaleteros,
    setaguaBateria,
    aguaBateria,
    haveAllKitMoto,
    blockSectionKits,
    setbaterias) => {
    return (
        <>
            <Paper elevation={3}
                style={{
                    marginTop: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '100%',
                    textAlign: 'center'
                }}>

                <Divider>ACCESORIOS PRODUCTO</Divider>
                <Stack direction='column' spacing={2}>
                    <FormControl sx={{ display: 'none' }}>
                        <FormLabel id="group-radio-isproduct" sx={{ textAlign: 'left' }}>EL PRODUCTO ES:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="group-radio-isproduct"
                            name="row-radio-buttons-group"
                            value={isConsignado}
                            onChange={(e) => setIsConsignado(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Consignado" />
                            <FormControlLabel value="2" control={<Radio />} label="Propio" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <FormControl mt={2}>
                        <FormLabel id="goup-label-kit" sx={{ textAlign: 'left' }}>KIT DE LA MOTO:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="goup-label-kit"
                            name="row-radio-buttons-group"
                            value={selectedKitMoto}
                            onChange={(e) => setSelectedKitMoto(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} onClick={(e) => haveAllKitMoto(true)} label="Todo" />
                            <FormControlLabel value="2" control={<Radio />} onClick={(e) => haveAllKitMoto(false)} label="Manual" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                </Stack>
                <Grid container spacing={5} mt={1} mb={5} sx={{ pointerEvents: blockSectionKits ? 'none' : '' }}>
                    <Grid item md={2}>
                        <SelectSINO titulo='LLAVE'
                            setSelect={setllaves}
                            itemSelect={llaves}></SelectSINO>
                    </Grid>
                    <Grid item md={2}>
                        <SelectSINO titulo='MANUAL'
                            setSelect={setmanual}
                            itemSelect={manual} />
                    </Grid>
                    <Grid item md={2}>
                        <SelectSINO titulo='BATERIA'
                            setSelect={setbaterias}
                            itemSelect={baterias} />
                    </Grid>
                    <Grid item md={3}>
                        <SelectSINO titulo='HERRAMIENTAS'
                            setSelect={setherramientas}
                            itemSelect={herramientas}></SelectSINO>
                    </Grid>
                    <Grid item md={3}>
                        <SelectSINO titulo='RETROVISORES'
                            setSelect={setretrovisores}
                            itemSelect={retrovisores}></SelectSINO>
                    </Grid>
                </Grid>
                <Divider>VARIOS</Divider>
                <Grid container spacing={2} mt={1} >
                    <Grid item md={3}>
                        <SelectSINO titulo='APOYA PIES'
                            setSelect={setapoyaPies}
                            itemSelect={apoyaPies}></SelectSINO>
                    </Grid>
                    <Grid item md={3}>
                        <SelectSINO titulo='PORTA PLACAS'
                            setSelect={setportaPlacas}
                            itemSelect={portaPlacas}></SelectSINO>
                    </Grid>
                    <Grid item md={3}>
                        <SelectSINO titulo='PORTA-MALETEROS'
                            setSelect={setportaMaleteros}
                            itemSelect={portaMaleteros}></SelectSINO>
                    </Grid>
                    <Grid item md={3}>
                        <SelectSINO titulo='AGUA-BATERIA'
                            setSelect={setaguaBateria}
                            itemSelect={aguaBateria}></SelectSINO>
                    </Grid>
                </Grid>
            </Paper>


        </>
    )
}

export default KitMotoinformacion