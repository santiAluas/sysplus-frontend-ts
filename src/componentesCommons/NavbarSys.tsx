// Navbar.tsx
import { Link } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

interface MenuItem {
  cod_menu: string;
  icon: string;
  link: string;
  grupo_permiso: string;
  nivel2: string;
}

interface Props {
  menus: MenuItem[];
}

const NavbarSys = ({ menus }: Props) => {
  return (
    <List>
      {menus.map((item) => {
        // Cargar el ícono dinámicamente desde @mui/icons-material
        const IconComponent =
          (MuiIcons as any)[item.icon] ?? MuiIcons["Menu"];

        return (
          <ListItemButton
            key={item.cod_menu}
            component={Link}
            to={`/${item.link}`} // 👈 aquí el link se convierte en ruta React Router
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={item.cod_menu} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default NavbarSys;
