import { Box, Grid, TextField, Typography } from "@mui/material";
import { kMaxLength } from "buffer";

const LocationBoxItem = ({ value, onChange, sxTextField }) => {
  const handleChange = (campo) => (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, "");

    onChange({
      ...value,
      [campo]: soloNumeros,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        variant="body2"
        fontWeight="bold"
        color="text.secondary"
        mb={2}
      >
        Localización del item
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="RAC"
            variant="standard"
          
            value={value.rac}
            onChange={handleChange("rac")}
            fullWidth
            sx={sxTextField}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            slotProps={{ htmlInput: { maxLength: 1 } }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Columna"
            variant="standard"
            value={value.columna}
            onChange={handleChange("columna")}
            fullWidth
            sx={sxTextField}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Nivel"
            variant="standard"
            value={value.nivel}
            onChange={handleChange("nivel")}
            fullWidth
            sx={sxTextField}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Posición"
            variant="standard"
            value={value.posicion}
            onChange={handleChange("posicion")}
            fullWidth
            sx={sxTextField}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationBoxItem;