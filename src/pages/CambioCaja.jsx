import React from 'react'
import FechasCambiosCajas from '../components/FechasCambiosCajas';
import Button from '@mui/material/Button';
import SearchAgencia from '../components/SearchAgencia'
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';
import { Get_Organizations } from '../services/Service_Api_Cajas'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CambioCaja = () => {

  const [dateInit, setDateInit] = React.useState(dayjs());
  const [dateEnd, setDateEnd] = React.useState(dayjs());
  const [codAgencia, setCodAgenia] = React.useState("");
  const Change_Box = async (e) => {
    e.preventDefault()
    if (codAgencia.trim() === "") {
      toast.warn("DEBE ELEGIR UNA AGENCIA!", {
        position: toast.POSITION.TOP_CENTER
      });
      return
    }
    let result = ""
    const functionThatReturnPromise = async () => {
      try {
        result = await Get_Organizations(codAgencia, dateInit.format('YYYY-MM-DD'), dateEnd.format('YYYY-MM-DD'));
      } catch (error) {
        throw error;
      }
    };
    toast.promise(
      functionThatReturnPromise,
      {
        pending: {
          render({ data }) {
            return "ACTUALIZANDO ..."
          },
          position: toast.POSITION.TOP_CENTER
        },
        success: {
          render({ data }) {
            return "SE ACTUALIZO CORRECTAMENTE"
          },
          icon: "🟢",
          position: toast.POSITION.TOP_CENTER
        },
        error: {
          render({ data }) {
            return data
          },
          icon: '🔴',
          position: toast.POSITION.TOP_CENTER
        }
      }
    );
  }

  return (
    <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
      <legend>CAMBIO DE FECHA DE CAJA</legend>
      <ToastContainer />
      <div style={{ display: 'flex', 
                      alignItems: 'center' }}>
          <Typography fontWeight="bold" 
                      padding={2}>
              SELECCIONE AGENCIA
          </Typography>
          <SearchAgencia setCodAgencia={setCodAgenia} 
                         style={{ marginLeft: '2' }}></SearchAgencia>
        </div>
      <div style={{ display: 'flex', 
                    justifyContent:'start',
                    alignItems: 'center',
                    flexWrap:'wrap',
                    marginTop:"10px" }}>
      
        <FechasCambiosCajas initDate={dateInit} 
                            endDate={dateEnd} 
                            dateInit={setDateInit} 
                            dateEnd={setDateEnd}></FechasCambiosCajas>
      </div>
      <div style={{marginTop:'5px'}}>
        <Button variant="contained"
          onClick={(e) => Change_Box(e)}
          marginTop={5} 
          fullWidth >CAMBIO DE CAJA</Button>
      </div>
    </Box>
  )
}

export default CambioCaja