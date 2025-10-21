import { Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './css/DatosEmpleado.css'
const ValoresAnticipo = (props) => {
    const { valorMatricula, setValorMatricula, usuario } = props
    const { valoresMatriculacion, valorMatriculaActual } = props
    // const [valorMatricula, setValorMatricula] = useState({
    //     id:'',
    //     agencia:'',
    //     gestor:'',
    //     totalmatriculacion:0,
    // })


    useEffect(() => {
        const seleccionarPrimeto = () => {
            const valor = valoresMatriculacion.find(x => x.agencia === valorMatriculaActual.OrganizationName.split('-')[2]);
            if (valor !== undefined) {
                setValorMatricula(valor);
            }
            return valor ? valor.id : "";
        };

        const selectedValue = seleccionarPrimeto();
    }, [valoresMatriculacion, valorMatriculaActual]);

    const handleSelectChange = (event) => {
        const valor = valoresMatriculacion.filter(x => x.id === event.target.value)[0]
        setValorMatricula(valor);
    };

    const Generar_Select_Valores_Matricula = () => {
        return (
            <div>
                <InputLabel id="demo-simple-select-helper-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    fullWidth
                    onChange={handleSelectChange}
                    value={valorMatricula.id}
                    disabled={usuario === "DIEGOJARRO" ? false : true}
                >
                    {valoresMatriculacion.length > 0 ?
                        valoresMatriculacion.map((item, index) => (
                            <MenuItem key={item.id} value={item.id}>{item.ciudad} - ({item.agencia})</MenuItem>
                        ))
                        : (
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        )}
                </Select>
            </div>
        );
    }

    return (
        <>
            <Typography variant="h5"
                gutterBottom
                align='left'
                fontWeight="bold"
                color='#D9BD30'
                style={{
                    textShadow: '2px 1px 33px rgba(0, 0, 0, 0.5)'
                }}>
                VALORES
            </Typography>
            <Grid container spacing={3}>
                <Grid item sx={12} md={6} sm={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Ciudad Matriculacion
                    </p>
                    {Generar_Select_Valores_Matricula()}
                </Grid>
                <Grid item sx={12} md={6} sm={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Total Matriculacion
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                        value={parseFloat(valorMatricula.totalmatriculacion).toFixed(2)}
                    />
                </Grid>
                <Grid item sx={12} md={6} sm={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Gestor Matriculacion
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        value={valorMatricula.gestor}
                        className='TexfieldEmpleado'
                    />
                </Grid>
                <Grid item sx={12} md={6} sm={12}>
                    {/* <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Organizacion
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        value={valorMatricula.agencia}
                    /> */}
                </Grid>
            </Grid>
        </>
    )
}

export default ValoresAnticipo;
