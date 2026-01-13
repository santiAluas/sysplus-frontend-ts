// src/componentesCommons/Navbar.tsx
import { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
  userName: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const Navbar = ({ userName, onLogout, onToggleSidebar }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="transparent"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        maxHeight: 65,
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        background: "linear-gradient(90deg, #0a192f, #1e3a8a) !important",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: 64,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Botón de menú SOLO en celular */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ ml:1,  mr: 2, display: { xs: "block", md: "none" }, p: 0.5 }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: "0.9rem", lineHeight: 1, color: "white" }}
          >
            SYSPLUS 2.0
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuClick} sx={{ gap: 0.5, p: 0.5 }}>
            <Avatar sx={{ width: 28, height: 28 }}>
              <AccountCircleIcon fontSize="small" />
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.75rem", lineHeight: 1, color: "white" }}
            >
              {userName}
            </Typography>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
