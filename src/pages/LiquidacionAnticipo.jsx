import React, { useEffect } from 'react'
import InformacionFactura from '../components/LiquidacionMatricula/InformacionFactura'
import { ToastContainer, toast } from 'react-toastify';
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Paper } from '@mui/material';
import LiquidacionMatriculaComponente from '../components/LiquidacionMatricula/LiquidacionMatriculaComponente';

const LiquidacionAnticipo = (numeroDocumento = null) => {
  const [numeroIdentificacion, setNumeroIdentificacion] = React.useState("")
  const [numeroFacturaGrabar, setNumeroFacturaGrabar] = React.useState("")
  const [ramv, setramv] = React.useState("")
  const [keyComponent, setKeyComponent] = React.useState(1)

  useEffect(() => {
    if(!numeroDocumento){
      setNumeroFacturaGrabar(numeroDocumento)
    }
  }, [])
  
  return (
    <div key={keyComponent}>
      <ToastContainer  />
      <NavbarMasterMoto titulo="LIQUIDACION MATRICULACION" />
      <br/>
        <Paper elevation={3}
        style={{
          marginRight: 20,
          marginLeft: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}>
        <InformacionFactura  setNumeroIdentificacion={setNumeroIdentificacion} setNumeroFacturaGrabar={setNumeroFacturaGrabar} setramv={setramv}/>
        <br/>
        <LiquidacionMatriculaComponente  numeroIdentificacion={numeroIdentificacion} numeroFacturaGrabar={numeroFacturaGrabar} ramv={ramv} setKeyComponent={setKeyComponent}/>
      </Paper>
    </div>
  )
}

export default LiquidacionAnticipo