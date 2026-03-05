import  { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Decrypt_User } from '@/services/Storage_Service';
import { estaHabilitadoElUsuario } from '@/pages/AdministradorAnticipos/services/ServicioWebAnticipoAdministracion';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SubirValores = (props) => {
    const { titulo, liquidacion, setmodificcion, pagosExtraordinario = 0 } = props;
    const [selectedImage, setSelectedImage] = useState(null);
    const [valor, setValores] = useState(0)
    const [estaHabilitado, setEstaHabilitado] = useState(false);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedImage(file);
                liquidacion.file = file
            } else {
                alert('Por favor, seleccione un archivo de imagen.');
                e.target.value = '';
            }
        }
    };

    const modificarValor = (value) => {
        // if (value === '0') {
        //     setValores('');
        //   } else {
        //     setValores(value);
        //   }
        // if (value === "") {
        //     value = 0
        //     liquidacion.file = null
        // } else {
        //     value = value
        // }

        if (esNumero(value)) {
            setValores(parseFloat(value))
            liquidacion.valor = value
            generarNumeroAleatorio()
        }
    };


    const generarNumeroAleatorio = () => {
        const numeroAleatorio = Math.floor(Math.random() * 1000); // Puedes ajustar el rango según tus necesidades
        setmodificcion(numeroAleatorio.toString());
    };

    function esNumero(cadena) {
        return !isNaN(cadena) && !isNaN(parseFloat(cadena));
    }

    const handleBlur = (e) => {
        if (valor === '') {
            setValores('0'); // Establecer el valor en cero si está vacío
        }
      };


    useEffect(() => {
        modificarValor(valor)
    }, [valor, setValores,pagosExtraordinario]);

    const yaEjecutado = useRef(false);

    useEffect(() => {
    if (yaEjecutado.current) return;
    yaEjecutado.current = true;

    verificarEstaHabilitado();
    }, []);
    
    const verificarEstaHabilitado = async () => {
        const user = Decrypt_User();
        const respuesta = await estaHabilitadoElUsuario(user.User);
        console.log("respuesta", respuesta)
        setEstaHabilitado(respuesta)
    }

    return (
        <Grid container paddingTop={2} style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
            <Grid item sx={3} md={3}>
                <p style={{
                    paddingBottom: 0,
                    marginBottom: 0
                }}>{titulo}</p>
            </Grid>
            <Grid item sx={4} md={2}>
                <TextField
                    id="standard-basic"
                    label=""
                    variant="standard"
                    type='number'
                    value={valor}
                    disabled={(titulo === "Pagos Extraordinarios" && !estaHabilitado )}
                    onBlur={(e) => handleBlur(e.target.value)} 
                    onChange={(e) => setValores(e.target.value)}
                />
            </Grid>
            <Grid item sx={5} md={4} paddingLeft={2}>
                <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <Button component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        style={{ display: ((valor !== '0' && valor !== 0 && valor !== '') ? '' : 'none') }} >
                        Subir IMG.
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                    </Button>
                </div>
            </Grid>
            <Grid item sx={5} md={3} >
                <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                {
                    liquidacion.file === null
                        ?
                        ""
                        :
                        <Zoom>
                            <img style={{ width: '30%' }} src={URL.createObjectURL(liquidacion.file)} alt={liquidacion.file.name}></img>
                        </Zoom>
                }
                </div>
            </Grid>
        </Grid>
    );
};

export default SubirValores;
