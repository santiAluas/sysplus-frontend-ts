import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";

const NavbarM: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCerrar = () => {
    setAnchorEl(null);
    alert("Se cerró la sesión (ejemplo)"); // Aquí puedes colocar tu lógica de cerrar sesión
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleClick}
          >
            Nombre
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable al dar clic en el nombre */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCerrar}>
          <CloseIcon fontSize="small" sx={{ mr: 1 }} />
          Cerrar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarM;
