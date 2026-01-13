import { useState } from "react";
import {
  Box,
  Button,
  ButtonProps,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Scanner } from "@yudiel/react-qr-scanner";
import Logo from "@/assets/images/Logo.png";

type CameraStatus = "idle" | "granted" | "denied";

const YellowButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#FFD60A",
  background: "#FFD60A",
  color: "#000",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#FFCA03",
    color: "#000",
  },
}));

const ConsultaMasterMotoScreen = () => {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [qrValue, setQrValue] = useState<string>("");

  const requestCameraAccess = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus("denied");
        return;
      }

      // Solo para probar permisos y cerramos el stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((t) => t.stop());

      setCameraStatus("granted");
    } catch (error) {
      console.error(error);
      setCameraStatus("denied");
    }
  };



  return (
    <Box
      sx={{
        minHeight: "80vh",
        m: 0,
        p: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          maxWidth: 420,
          width: "90%",
          bgcolor: "rgba(0,0,0,0.75)",
          color: "#fff",
          borderRadius: 3,
          backdropFilter: "blur(4px)",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box
            component="img"
            src={Logo}
            alt="Master Moto"
            sx={{ height: 60, objectFit: "contain" }}
          />

          <Typography variant="h6" fontWeight={700} align="center">
            Consulta Master Moto
          </Typography>
          <Typography variant="body2" align="center">
            Escanea el código QR de tu comprobante para continuar.
          </Typography>

          {cameraStatus === "idle" && (
            <>
              <Typography variant="body2" align="center">
                Para leer el QR necesitamos acceso a la cámara.
              </Typography>
              <YellowButton
                fullWidth
                variant="contained"
                onClick={requestCameraAccess}
              >
                Activar cámara
              </YellowButton>
            </>
          )}

          {/* Cámara denegada */}
          {cameraStatus === "denied" && (
            <>
              <Typography variant="body2" align="center" color="error">
                No tenemos acceso a la cámara. Verifica los permisos del
                navegador y vuelve a intentarlo.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={requestCameraAccess}
              >
                Volver a intentar
              </Button>
            </>
          )}

          {/* Cámara permitida: mostrar lector QR */}
          {cameraStatus === "granted" && (
            <>
              <Typography variant="body2" align="center">
                Apunta la cámara al código QR.
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 320,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Scanner
                  onScan={(detectedCodes) => {
                    const first = detectedCodes[0];
                    if (first?.rawValue) {
                      setQrValue(first.rawValue);
                    }
                  }}
                  onError={(error) => {
                    console.error(error);
                    setCameraStatus("denied");
                  }}
                  constraints={{
                    facingMode: "environment", // cámara trasera en móvil
                  }}
                  styles={{
                    container: { width: "100%" },
                    video: { width: "100%" },
                  }}
                />
              </Box>

              <TextField
                label="QR leído"
                fullWidth
                value={qrValue}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                }}
                disabled
              />
              {qrValue && (<YellowButton fullWidth onClick={() => window.open(qrValue, "_blank")}>
                Canjear
              </YellowButton>)}
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ConsultaMasterMotoScreen;
