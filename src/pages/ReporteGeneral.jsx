import React from 'react'
import ReporteBaseDownloadExcel from '../components/ReporteBaseDownloadExcel'
import { manejoMensajes } from '../helpers/ManejoExcepciones'
import {DESCARGAR_REPORTE_EXCEL_GENERAL} from '../services/ReporteGeneralesServices/Services'
import dayjs from 'dayjs';

const ReporteGeneral = ({title = '', tipoReporte= '', departamento= '', conrangofechas = true}) => {
  const [dateInit, setDateInit] = React.useState(dayjs().subtract(5, 'day'));
  const [dateEnd, setDateEnd] = React.useState(dayjs());

  const Descargar_Reporte = async () =>{
    manejoMensajes(ObteniendoReporte, "DESCARGANDO ...")
  }

  const ObteniendoReporte = async () =>{
    try {
      const result = await DESCARGAR_REPORTE_EXCEL_GENERAL(tipoReporte,tipoReporte,dateInit.format('DD-MM-YYYY'), dateEnd.add(1, 'day').format('DD-MM-YYYY'));
    } catch (error) {
      throw error;
    }
  }
  return (
    <>
        <ReporteBaseDownloadExcel title={title} 
                                  conrangofecha={conrangofechas} 
                                  departamento={departamento}  
                                  funcionReporte={Descargar_Reporte}
                                  dateInit={dateInit}
                                  setDateInit={setDateInit}
                                  dateEnd={dateEnd}
                                  setDateEnd={dateEnd}/>
    </>
  )
}

export default ReporteGeneral