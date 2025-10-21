import React, { useEffect, useState } from 'react'
import InformationClientCredit from '../components/CreditInfoClient/InformationClientCredit'
import { Button, Divider, Grid, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';
import SearchBlobal from '../components/SearchBlobal'
import { GET_CLIENT_INFO_GARANCHECK,
        SAVE_INFORMATION_CLIENT_CREDIT,
        GET_INFO_INEC,
        GET_INFO_CREDIT,
        SAVE_INFO_CREDIT,
        DOWNLOAD_PDF_CREDIT } from '../services/GaranCheck/Api_GarantCheck'
import Box from '@mui/material/Box';
import ApplicationCredit from '../components/CreditInfoClient/ApplicationCredit';
import InfoClient from '../components/CreditInfoClient/InfoClient';
import InfoHome from '../components/CreditInfoClient/InfoHome';
import CustomerClient from '../components/CreditInfoClient/CustomerClient';
import SourceCustumerIncome from '../components/CreditInfoClient/SourceCustumerIncome';
import SpouseEconomicActivity from '../components/CreditInfoClient/SpouseEconomicActivity';
import EconomicInformation from '../components/CreditInfoClient/EconomicInformation';
import BankDebitAccount from '../components/CreditInfoClient/BankDebitAccount';
import { UserInfoCredit } from '../Models/UserInfoCredit'
import InfoConyuge from '../components/CreditInfoClient/InfoConyuge';
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../helpers/ManejoExcepciones.js'
import dayjs from 'dayjs';
const ConsultInfoClientCredi = () => {
  const infonull = {
    typeIdentification: "",
    documentIdentity: "",
    address: "",
    nationality: "",
    typeIdentificationConyuge: "",
    docuementIdentityConyuge: "",
    nameConyuge: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phones: "",
    email: '',
    maritalStatus: "",
    documentIdentityFather: "",
    fullNameFather: "",
    documentIdentityMother: "",
    fullNameMother: "",
    vehicles: "",
    campanies: []
  }

  const infoINEC = {"id":"",
                    "alimentosbebidas":0.0,
                    "vivienda":0.0,
                    "indumentaria":0.0,
                    "miscelaneos":0.0,
                    "estado":""}

  const CreditEmpty = {
    agencia_nom: "",
    f_creacion:"",
    cliente_cod:"",
    cliente_nom:"",
    forma_pago_nom:"",
    nom_usuario:"",
    valor_financiado:"",
    meses_plazo:"",
    valor_entrada:"",
    valor_cuota:"",
    documentno:"",
    product:"",
    codeudor:""
  }


  const [valuesINEC, setValuesINEC] = useState(infoINEC)
  const [parameterSearch, setParameterSearch] = useState("")
  const [infoClient, setinfoClient] = useState(infonull)
  const [infoCredit, setinfoCredit]= useState(CreditEmpty)

  const [clientCreditInfo, setClientCreditInfo] = useState(UserInfoCredit)
  const searchClientGaranCheck = async () => {

    const functionThatReturnPromise = async () => {
      try {
        const responseInfoCredit = await GET_INFO_CREDIT(parameterSearch);
        if(responseInfoCredit.length >0){
          setinfoCredit(responseInfoCredit[0])
          const response = await GET_CLIENT_INFO_GARANCHECK(responseInfoCredit[0].cliente_cod);
          mapperInfoClient(response)
        }
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "BUSCANDO ....")
  }

  const mapperInfoClient = (response) => {
    setClientCreditInfo(prevState => {
      const nextState = {
        ...prevState,
        numberIdentification: response.documentIdentity,
        dateBirth:  dayjs( response.dateOfBirth).format('YYYY/MM/DD'),
        nationality: response.nationality,
        typeIdentification: response.typeIdentification,
        statusCivil: response.maritalStatus,
        phone: response.phones,
        email: response.email,
        referenceClient: {
          ...prevState.referenceClient,
          referenceClientOne: {
            ...prevState.referenceClient.referenceClientOne,
            name: response.fullNameFather,
            relationShip: 'PADRE',
          },
          referenceClientTwo: {
            ...prevState.referenceClient.referenceClientTwo,
            name: response.fullNameMother,
            relationShip: 'MADRE',
          }
        },
        dataConyuge: {
          ...prevState.dataConyuge,
          typeIdentification: response.typeIdentificationConyuge,
          numberIdentification: response.docuementIdentityConyuge,
          firstNameClient: response.nameConyuge,
          lastNameClient: response.nameConyuge
        }
      };

      // Condición para actualizar sourceIncome si response.companies tiene datos
      if (response.campanies.length > 0) {
        nextState.sourceIncome = {
          ...prevState.sourceIncome,
          privateEmployee: {
            ...prevState.sourceIncome.privateEmployee,
            nameCompany: response.campanies[0].name,
            timeCompany: "S/N",
            isAfiliado: "1",
            address: response.campanies[0].location,
            phone: "S/N",
            cargo: response.campanies[0].occupation,
            bossName: "S/N",
          }
        };
      }

      return nextState;
    });
  }

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setClientCreditInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (keys.length === 2) {
      setClientCreditInfo(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value
        }
      }));
    } else if (keys.length === 3) {
      setClientCreditInfo(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: {
            ...prevState[keys[0]][keys[1]],
            [keys[2]]: value
          }
        }
      }));
    }
  };


  const validaciones = ()=>{
    if (!validateUserInfoCredit(clientCreditInfo) ){
      return "PORFAVOR VERIFIQUE QUE LOS DATOS DEL CLIENTE ESTEN LLENOS"
    }
    if (!validateUserInfoCredit(clientCreditInfo.dataHome) ){
      return "PORFAVOR VERIFIQUE QUE LOS DATOS DE LA VIVIENDA ESTEN LLENOS"
    }
    if (!validateUserInfoCredit(clientCreditInfo.referenceClient.referenceClientOne) ){
      return "PORFAVOR VERIFIQUE QUE LA REFERENCIA UNO DEL CLIENTE ESTE LLENO"
    }
    if (!validateUserInfoCredit(clientCreditInfo.referenceClient.referenceClientTwo) ){
      return "PORFAVOR VERIFIQUE QUE LA REFERENCIA DOS DEL CLIENTE ESTE LLENO"
    }
    if (!validateUserInfoCredit(clientCreditInfo.referenceClient.referenceClientThree) ){
      return "PORFAVOR VERIFIQUE QUE LA REFERENCIA TRES DEL CLIENTE ESTE LLENO"
    }
    if (!validateUserInfoCredit(clientCreditInfo.informationCount)   ){
      return "lAS CUENTAS DE DEBITO DEBE SER LLENADO"
    }
    // if (!validateUserInfoCredit(clientCreditInfo.sourceIncome.ownBusiness)  || !validateUserInfoCredit(clientCreditInfo.sourceIncome.privateEmployee)   ){
    //   return "FUENTE DE INGRESOS CLIENTE DEBE SER LLENADO"
    // }
    if (!validateInformationEconomic() ){
      return "INFORMACION ECONOMICA CLIENTE DEBE SER LLENADO"
    }
    return ""
  }

  const validateInformationEconomic=()=>{
    if (clientCreditInfo.informationEconomic.income.total === 0){
      return false
    }
    if (clientCreditInfo.informationEconomic.income.expenses === 0){
      return false
    }
    return true
  }

   const validateUserInfoCredit = (userInfo) => {
    for (const key in userInfo) {
        if (userInfo.hasOwnProperty(key)) {
            if (userInfo[key] === '') {
                return false;
            }
        }
    }
    return true;
};

  const saveInforCreditInfo = () => {

    const message = validaciones();
    if(message!== ""){
      return toast.warning(message, { position: toast.POSITION.TOP_CENTER });
    }
    const functionThatReturnPromise = async () => {
      try {
        const response2 = await SAVE_INFO_CREDIT(infoCredit);
        const response = await SAVE_INFORMATION_CLIENT_CREDIT(infoCredit.documentno,clientCreditInfo);
        await DOWNLOAD_PDF_CREDIT(infoCredit.documentno)
        setValuesINEC(infoINEC)
        setParameterSearch("")
        setinfoCredit(CreditEmpty)
        setClientCreditInfo(UserInfoCredit)
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "SE GRABO EXITOSAMENTE ....")
  }

  const getInfoINEC = async () =>{
    const response = await GET_INFO_INEC();
    if(response.length > 0){
      setValuesINEC(response[0])
    }
  }

  useEffect(() => {
    getInfoINEC()
  }, []); 

  return (
    <>
      <ToastContainer />
      <SearchBlobal parameterSearch={parameterSearch}
        setParameterSearch={setParameterSearch}
        functionExecute={searchClientGaranCheck} />
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <Typography fontWeight="bold" textAlign="center" variant='h5' component='h2'  >
          MASTERMOTO - UNNOPARTS
        </Typography>
        <Typography fontWeight="bold" textAlign="center" variant='h5' component='h2' >
          SOLICITUD DE CREDITO
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              width='100%'
              sx={{ border: '2px solid grey' }}
              pl={2}
              pr={2}
            >
              <ApplicationCredit  infoCredit={infoCredit}/>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                DATOS DEL CLIENTE
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <InfoClient client={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                DATOS DEL CONYUGE
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <InfoConyuge client={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                DATOS VIVIENDA
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <InfoHome info={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                REFERENCIAS CLIENTE (2 FAMILIAR Y 1 PERSONAL)
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <CustomerClient number={1} info={clientCreditInfo} handleChange={handleChange} />
              <CustomerClient number={2} info={clientCreditInfo} handleChange={handleChange} />
              <CustomerClient number={3} info={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                FUENTE DE INGRESOS CLIENTE
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <SourceCustumerIncome info={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                ACTIVIDAD ECONOMICA CONYUGE
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <SpouseEconomicActivity info={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                INFORMACION ECONOMICA
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <EconomicInformation info={clientCreditInfo} handleChange={handleChange} infoINEC={valuesINEC} setInfo={setClientCreditInfo}/>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography fontWeight="bold" textAlign="center" variant='h6' component='h2'  >
                INFORMACION CUENTA DEBITO
              </Typography>
            </Divider>
            <br />
            <Box width='100%'
              sx={{ border: '2px solid grey' }}
              padding={2}>
              <BankDebitAccount info={clientCreditInfo} handleChange={handleChange} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button variant="contained" fullWidth size='large' onClick={saveInforCreditInfo}>GRABAR INFORMACION</Button>

    </>
  )
}

export default ConsultInfoClientCredi