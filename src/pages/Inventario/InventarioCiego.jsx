import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import precaucionfondo from '../../assets/images/precaucionfondo.jpg';
import DescripcionItem from '../../components/AuditoriaStock/DescripcionItem.jsx';
import CabeceraInventario from './components/CabeceraInventario.jsx';
import ConfirmDialog from '../../components/TomaInventarioFisicoComp/ConfirmDialog.jsx';
import LocationBoxItem from './components/LocationBoxItem.jsx';
import InventarioCiegoHook from './hooks/InventarioCiegoHook.js';
import agenciaVaciaImage from '@/assets/images/agencia_vacia.png';

const InventarioCiego = () => {
  const {
    agencuasUsuarios,
    seleccionarAgencia,
    seleccionarAgenciaYJefeAgencia,
    objectAgencia,
    selectNameAgencia,
    userLogin,

    codigoProducto,
    setCodigoProducto,
    codProducto,
    setCodProducto,
    descripcion,
    setDescripcion,
    organizations,
    setOrganizations,
    counterComponent,

    cantidad,
    cantidadBuenEstado,
    setCantidadBuenEstado,
    cantidadMalEstado,
    setCantidadMalEstado,
    setCountProduct,

    existProduct,
    checkProductExist,
    esSobrante,
    generarSobrante,

    observacion,
    setObservacion,
    observationSelection,
    SelectObservation,
    habiliatObsercacion,

    isKit,
    CheckIsKit,
    estadoKit,
    handleKitStateChange,
    observacionesKit,
    setObservacionesKit,
    activarObservacionesKit,

    ubicacion,
    setUbicacion,

    estiloLaberBuenMalEstado,

    openFinishAuditory,
    setOpenFinishAuditory,
    confirmInventoryFinish,
    cancelConfirmInventoryFinish,

    grabarItem
  } = InventarioCiegoHook();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: 3,
        backgroundColor: '#f4f6f8'
      }}
    >
      <ConfirmDialog
        title={`Desea finalizar el inventario de la agencia:  ${selectNameAgencia.trim().length === 0 || selectNameAgencia.trim() === "-- SELECT --" ? "SIN AGENCIA SELECCIONADA" : selectNameAgencia}`}
        functionConfirm={confirmInventoryFinish}
        functionCancel={cancelConfirmInventoryFinish}
        setOpen={setOpenFinishAuditory}
        open={openFinishAuditory}
      />

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{
          width: '100%',
          px: { xs: 1.5, md: 2 }
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2.5, md: 3 },
            width: '90%',
            mx: 'auto',
            borderRadius: 3,
            overflow: 'hidden',
            color: 'white',
            textAlign: 'center',
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.78), rgba(127, 29, 29, 0.72)), url(${precaucionfondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <Divider
            sx={{
              mb: 2,
              '&::before, &::after': {
                borderColor: 'rgba(255,255,255,0.45)'
              }
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 16, md: 20 },
                  letterSpacing: 1,
                  color: '#ffffff'
                }}
              >
                ACCIONES ESPECIALES
              </Typography>

              <Typography
                component="span"
                className="parpadeo-rojo"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 13, md: 15 },
                  color: '#fecaca'
                }}
              >
                (PRECAUCIÓN)
              </Typography>
            </Stack>
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                className="parpadeo-rojo"
                size="large"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.4,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  borderRadius: 2,
                  color: '#064e3b',
                  backgroundColor: '#9ecfbc',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: '#86bfa9',
                    boxShadow: 6
                  }
                }}
                onClick={() => setOpenFinishAuditory(true)}
              >
                FINALIZAR INVENTARIO
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <CabeceraInventario
          seleccionarAgencia={seleccionarAgencia}
          seleccionarAgenciaYJefeAgencia={seleccionarAgenciaYJefeAgencia}
          agencuasUsuarios={agencuasUsuarios}
          userLogin={userLogin}
          objectAgencia={objectAgencia}
        />

        <Box
          component="img"
          src={agenciaVaciaImage}
          alt="Agencia no seleccionada"
          sx={{
            p: 2,
            width: { xs: '85%', sm: '65%', md: '45%', lg: '35%' },
            maxWidth: 520,
            objectFit: 'contain',
            display: seleccionarAgencia === '0' ? 'block' : 'none'
          }}
        />

        <Paper
          elevation={4}
          sx={{
            p: { xs: 2.5, md: 4 },
            width: '90%',
            mx: 'auto',
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            display:
              seleccionarAgencia === '0' || !seleccionarAgencia
                ? 'none'
                : 'block'
          }}
        >
          <Typography
            textAlign="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              color: '#111827',
              letterSpacing: 0.6
            }}
          >
            TOMA FÍSICA INVENTARIO CIEGO
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider
                sx={{
                  '&::before, &::after': {
                    borderColor: '#d1d5db'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: 0.5
                  }}
                >
                  INFORMACIÓN PRODUCTO
                </Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} md={6} />

            <Grid item xs={12} md={6}>
              <FormGroup
                sx={{
                  alignItems: { xs: 'flex-start', md: 'flex-end' }
                }}
              >
                <FormControlLabel
                  required
                  onChange={checkProductExist}
                  control={<Checkbox checked={existProduct} />}
                  label="PRODUCTO NO IDENTIFICADO"
                  sx={{
                    m: 0,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </FormGroup>
            </Grid>

            <Grid item lg={6} sm={12} xs={12}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              >
                {!existProduct ? (
                  <DescripcionItem
                    key={counterComponent}
                    organizations={organizations}
                    setOrganizations={setOrganizations}
                    setCodProducto={setCodProducto}
                    setDescriptionProduct={setDescripcion}
                  />
                ) : (
                  <>
                    <FormGroup sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={esSobrante}
                            onChange={(e) => generarSobrante(e.target.checked)}
                          />
                        }
                        label="SOBRANTE"
                      />
                    </FormGroup>

                    <TextField
                      id="codProducto"
                      label="CÓDIGO PRODUCTO"
                      variant="outlined"
                      value={codigoProducto}
                      sx={{
                        display: esSobrante ? 'none' : 'block'
                      }}
                      onChange={(e) => setCodigoProducto(e.target.value)}
                      fullWidth
                    />
                  </>
                )}
              </Box>
            </Grid>

            <Grid item lg={6} sm={12} xs={12}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              >
                <Grid container spacing={3}>
                  <Grid item lg={4} sm={12} xs={12}>
                    <TextField
                      id="CANTIDAD_BUEN_ESTADO"
                      label="CANTIDAD BUEN ESTADO"
                      variant="standard"
                      value={cantidadBuenEstado}
                      onChange={(e) => setCountProduct(e, setCantidadBuenEstado)}
                      fullWidth
                      autoComplete="off"
                      inputProps={{
                        autoComplete: 'off',
                        form: {
                          autoComplete: 'off'
                        }
                      }}
                      sx={estiloLaberBuenMalEstado('#4CAF50')}
                    />
                  </Grid>

                  <Grid item lg={4} sm={12} xs={12}>
                    <TextField
                      id="CANTIDAD MAL ESTADO"
                      label="CANTIDAD MAL ESTADO"
                      variant="standard"
                      value={cantidadMalEstado}
                      onChange={(e) => setCountProduct(e, setCantidadMalEstado)}
                      fullWidth
                      sx={estiloLaberBuenMalEstado('#FF5733')}
                    />
                  </Grid>

                  <Grid item lg={4} sm={12} xs={12}>
                    <TextField
                      id="CANTIDAD TOTAL"
                      label="CANTIDAD"
                      variant="standard"
                      value={cantidad}
                      disabled={true}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {existProduct && (
              <Grid item lg={6} sm={12} xs={12}>
                <TextField
                  id="DESCRIPCION"
                  label="DESCRIPCIÓN"
                  variant="outlined"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  fullWidth
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!(cantidadMalEstado > 0)}>
                <InputLabel id="observaciones-label">OBSERVACIONES</InputLabel>
                <Select
                  labelId="observaciones-label"
                  id="observaciones"
                  label="OBSERVACIONES"
                  fullWidth
                  value={observationSelection}
                  sx={{ width: '100%' }}
                  onChange={(e) => SelectObservation(e.target.value)}
                >
                  <MenuItem value={0}>-- ESTADO --</MenuItem>
                  <MenuItem value="OBSOLETO">OBSOLETO</MenuItem>
                  <MenuItem value="CADUCADO">CADUCADO</MenuItem>
                  <MenuItem value="USADO">USADO</MenuItem>
                  <MenuItem value="RAYADO">RAYADO</MenuItem>
                  <MenuItem value={5}>OTROS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              {userLogin?.Parametros?.tiene_localizacion_items_inventario && (
                <LocationBoxItem
                  value={ubicacion}
                  onChange={setUbicacion}
                  sxTextField={estiloLaberBuenMalEstado('#3ba352')}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              >
                <FormGroup
                  sx={{
                    textAlign: 'center',
                    alignItems: 'center'
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isKit}
                        onChange={CheckIsKit}
                      />
                    }
                    label="ES KIT ?"
                  />

                  {isKit && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="estado-kit-label">ESTADO DEL KIT</InputLabel>
                      <Select
                        labelId="estado-kit-label"
                        id="estado-kit"
                        label="ESTADO DEL KIT"
                        fullWidth
                        value={estadoKit}
                        sx={{ width: '100%' }}
                        onChange={(e) => handleKitStateChange(e.target.value)}
                      >
                        <MenuItem value={0}>-- ESTADO --</MenuItem>
                        <MenuItem value="COMPLETO">COMPLETO</MenuItem>
                        <MenuItem value="INCOMPLETO">INCOMPLETO</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </FormGroup>
              </Box>
            </Grid>
            {isKit && (
              <Grid item lg={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  id="observacion-kit"
                  label="ESCRIBIR OBSERVACIÓN KIT..."
                  placeholder="Escribir...."
                  multiline
                  disabled={activarObservacionesKit}
                  rows={4}
                  variant="standard"
                  value={observacionesKit}
                  onChange={(e) => setObservacionesKit(e.target.value)}
                  sx={{
                    display: activarObservacionesKit !== true ? 'block' : 'none',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </Grid>

            )}


            <Grid item lg={12} sm={12} xs={12}>
              <Divider
                sx={{
                  mt: 1,
                  '&::before, &::after': {
                    borderColor: '#d1d5db'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: 0.5
                  }}
                >
                  OBSERVACIONES
                </Typography>
              </Divider>
            </Grid>

            <Grid item lg={12} sm={12} xs={12}>
              <TextField
                fullWidth
                id="observacion-general"
                label="ESCRIBIR OBSERVACIÓN ..."
                placeholder="Escribir...."
                multiline
                disabled={habiliatObsercacion}
                rows={4}
                variant="standard"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={grabarItem}
                sx={{
                  py: 1.5,
                  mt: 1,
                  borderRadius: 2,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  backgroundColor: '#1f6feb',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: '#1a5fd0',
                    boxShadow: 6
                  }
                }}
              >
                GRABAR ITEM
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Box>
  );
};

export default InventarioCiego;