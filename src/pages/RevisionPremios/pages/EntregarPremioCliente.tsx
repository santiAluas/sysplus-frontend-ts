import { showAlert } from "@/utils/modalAlerts";
import { useSearchParams } from "react-router-dom";
import { consultarClientePremio, entregarPremioServicioWeb, verificarSiYaCanjeoServicioWeb } from "../services/PremiosServiciosWeb";
import { useEffect, useState } from "react";
import { PremiosConsultaInDto } from "../models/PremiosConsultaInDto";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useLoading } from "@/componentesCommons/LoadingContext";
import { Decrypt_User } from "@/services/Storage_Service";

const EntregarPremioCliente = () => {
  const [searchParams] = useSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const [verificarSiExiste, setVerificarSiExiste] = useState<boolean>()
  const [facturaCliente, setFacturaCliente] = useState<PremiosConsultaInDto>();
  const factura = searchParams.get("factura");
  const cedula = searchParams.get("cedula");

  const validaciones = [
    { condition: !factura, message: "La Factura no puede ser vacía" },
    { condition: !cedula, message: "La Cédula no puede ser vacía" }
  ];

  const exponerAlerta = (titulo: string, mensaje: string, tipo: string) => {
    const configAlert = {
      title: titulo,
      message: mensaje,
      type: tipo,
      callBackFunction: false,
    };
    showAlert(configAlert);
  }

  const verificarSiYaCanjeo = async () => {
    const respuesta = await verificarSiYaCanjeoServicioWeb(factura);
    return respuesta;
  }


  const consultarFacturaCliente = async () => {
    try {
      const verificar = await verificarSiYaCanjeo();
      if (verificar) {
        setVerificarSiExiste(true)
        return;
      }

      for (const v of validaciones) {
        if (v.condition) {
          exponerAlerta("Error", v.message, "error");
          return;
        }
      }
      startLoading();
      const respuesta = await consultarClientePremio(factura, cedula);
      stopLoading();
      if (respuesta.length === 0) {
        exponerAlerta("Error", "<strong>No existen clientes</strong>", "error")
        return
      }
      setFacturaCliente(respuesta[0]);
      // setAbrirModal(true);
    } catch (error) {
      stopLoading();
    }
  }

  useEffect(() => {

    consultarFacturaCliente();
  }, [])

  const confirmarEntregaPremio = async () => {
    try {
      startLoading();
      const user = Decrypt_User();
      await entregarPremioServicioWeb(facturaCliente.num_factura, facturaCliente.cliente, user.User);
        setVerificarSiExiste(true)

      exponerAlerta("Correcto", "Se registro correctamente", "success")
    } finally {
      stopLoading();
    }
  }
  return (
    <>
      {verificarSiExiste ? (
        <Typography><strong>EL CLIENTE {facturaCliente?.cliente} YA RECIBIO SU PREMIO</strong></Typography>
      ) : (
        <Box >
          <Typography><strong>Factura:</strong > {facturaCliente?.num_factura}</Typography >
          <Typography><strong>Cliente:</strong> {facturaCliente?.cliente}</Typography>
          <Typography><strong>Fecha:</strong> {dayjs(facturaCliente?.fecha_factura).format("YYYY-MM-DD")}</Typography>
          <Typography><strong>Agencia:</strong> {facturaCliente?.agencia.split("-")[2]}</Typography>
          <Button fullWidth sx={{ marginTop: 2 }} onClick={confirmarEntregaPremio}>Entregar Premio</Button>
        </Box >
      )}

    </>
  )
}

export default EntregarPremioCliente