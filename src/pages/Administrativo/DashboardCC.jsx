import { Box, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Agencysummary from './components/Agencysummary'
import TeamCardCC from './components/TeamCardCC'
import QuarterlyTeamPerformanceCC from './components/QuarterlyTeamPerformanceCC.jsx'
import AgencyAccordionCC from './components/AgencyAccordionCC'
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { ToastContainer, toast } from 'react-toastify';
import {
  REPORT_EMPLOYEE_ORDER,
  GET_ALL_EMPLOYEE_AGENCY,
  GET_ALL_AGENCY
} from '../../services/Administrativo_Apis/Api_Administrativo'
import dayjs from 'dayjs';
import ReportPerformanceEmployee from './components/ReportPerformanceEmployee.jsx'
import { Decrypt_User } from '../../services/Storage_Service.js'



const DashboardCC = () => {
  const[dataCumplimiento, setDatacumplimiento] = useState([])
  const[dataCumplimientoBar, setDatacumplimientoBar] = useState([])
  const [typeReportBar, setTypeRepportBar] = useState("SCC")
  const [dateInit, setDateInit] = React.useState(dayjs());
  const [dateInitBar, setDateInitBar] = React.useState(dayjs());

  const [typeReportPerformace, setTypeReportPerformace] = useState(0)
  const [orderBy, setOrderBy] = useState(true)
  const [facturasOrderBy, setfacturasOrderBy] = useState("ASC")
  const [solicitudesOrderBy, setSolicitudesOrderBy] = useState("ASC")
  const [dateInitPerfomace, setDateInitPerformace] = React.useState(dayjs());
  const [dataEmployeePerfomance, setDataEmployeePerformace] = useState([])
  const [userLogin, setUserLogin] = React.useState({});

  const OnInitPageUser =  () => {
    const user = Decrypt_User();
    if (user === null) {
        return toast.error("NO EXISTE NINGUN USUARIO LOGGEADO", { position: toast.POSITION.TOP_CENTER })
    }
    setUserLogin(user)
    return user;
}

useEffect(() => {
  const initializePage = async () => {
      fetchData();
      fetchData_ChartBar("SCC");
      generateReportGeneralOrderBy();
  };

  initializePage();
}, []);

  const fetchData = async () => {
    try {
      const user = OnInitPageUser();
      const respuesta = await GET_ALL_EMPLOYEE_AGENCY(dateInit,user.OrganizationId, user.User);
      setDatacumplimiento(respuesta)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_ChartBar = async () => {
    try {
      const user = OnInitPageUser();
      const respuesta = await GET_ALL_AGENCY(dateInitBar,typeReportBar,user.OrganizationId, user.User);
      setDatacumplimientoBar(respuesta)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
const generateReportGeneralOrderBy = async ()=>{
  try { 
    const user = OnInitPageUser();
    const type = typeReportPerformace === 0 ? "S" : (typeReportPerformace === 1 ? "P" :"F" ) ;
    const typeOrder = orderBy === true ? "DESC" : "ASC";
    const respuesta = await REPORT_EMPLOYEE_ORDER(dateInitPerfomace,type,typeOrder,user.OrganizationId, user.User);
    setDataEmployeePerformace(respuesta)
    setOrderBy(prevOrderBy => !prevOrderBy);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '100%',
          },
        }}
      >

        <Grid container spacing={2} sx={{ display: 'none' }}>
          <Grid item sm={3} lg={3} xl={3}>
            <Agencysummary status={"ok"} nameAgency={"ALBORADA"} agencyPercentage={"+15"} tittle={"MEJOR AGENCIA"} lastDate={"23 DE ENERO DEL 2024"} nameGestor={"AFNER PUEBLA"} />
          </Grid>
          <Grid item sm={3} lg={3} xl={3}>
            <Agencysummary status={"bad"} nameAgency={"9 DE OCTUBRE"} agencyPercentage={"-5"} tittle={"PEOR AGENCIA"} lastDate={"23 DE ENERO DEL 2024"} nameGestor={"SANDY CONFORME"} />
          </Grid>
          <Grid item sm={6} lg={6} xl={6}>
            <TeamCardCC />
          </Grid>
        </Grid>
        <ReportPerformanceEmployee data={dataEmployeePerfomance} 
                                  dateInit={dateInitPerfomace} 
                                  setDateInit={setDateInitPerformace}
                                  generateReport  ={generateReportGeneralOrderBy}
                                  tabValue={typeReportPerformace}
                                  setTabValue={setTypeReportPerformace}
                                  orderByType={orderBy}
                                  setOrderByType={setOrderBy} />
        <QuarterlyTeamPerformanceCC data={dataCumplimientoBar}  dateInit={dateInitBar} setDateInit={setDateInitBar}  generateReport={fetchData_ChartBar} setTypeRepportBar={setTypeRepportBar}/>
        <AgencyAccordionCC data={dataCumplimiento}  dateInit={dateInit} setDateInit={setDateInit}  generateReport={fetchData}/>
      </Box>
    </>
  )
}

export default DashboardCC