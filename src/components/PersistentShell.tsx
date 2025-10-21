// src/layouts/PersistentShell.tsx
import { useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/componentesCommons/Navbar";
import SidebarLayout, { MenuItem } from "@/componentesCommons/SidebarLayout";
import { Decrypt_User } from "@/services/Storage_Service";

export interface PersistentShellProps {
  menus: MenuItem[];
  userName: string;
  onLogout: () => void;
}

export default function PersistentShell({
  menus,
  userName,
  onLogout,
}: PersistentShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar
        userName={userName}
        onLogout={onLogout}
        onToggleSidebar={() => setMobileOpen((v) => !v)}
        key={1}
      />

      <SidebarLayout
        menus={menus ?? []}
        withAppBar={false}            
        mobileOpen={mobileOpen}      
        onMobileOpenChange={setMobileOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: "100%",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
