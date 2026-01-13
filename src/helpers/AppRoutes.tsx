// src/AppRoutes.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PersistentShell from "@/components/PersistentShell";
import { pages } from "./PageRender";
import { Decrypt_User, Delete_User } from "@/services/Storage_Service";
import Login from "@/components/Login";
import { routes } from "@/routes/route";
import { Index } from "@/pages/Index";
import RevisionPremiosIndex from "@/pages/RevisionPremios/RevisionPremiosIndex";
// ⚠️ Usa tu pantalla real de login:
// import { Dashboard } from "@/pages/Dashboard"; // si lo usas en pages

interface MenuItem {
  cod_menu: string;  
  icon: string;
  link: string;     
  grupo_permiso: string;
  nivel2: string;
}

const normalizePath = (link: string) => (link?.startsWith("/") ? link : `/${link}`);

export default function AppRoutes() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<any | undefined>(undefined); 
  // undefined = cargando, null = no logeado, objeto = logeado

  useEffect(() => {
    const user = Decrypt_User();
    if (!user) {
      setUserLogin(null);
      return;
    }
    setUserLogin({ ...user, Menus: Array.isArray(user.Menus) ? user.Menus : [] });
  }, []);

  const handleLogout = () => {
    Delete_User();
    window.location.reload();
    // navigate("/login");
  };

  const routedMenus: MenuItem[] = useMemo(() => {
    const list: MenuItem[] = userLogin?.Menus ?? [];
    return list;
  }, [userLogin]);

  if (userLogin === undefined) {
    return null; 
  }

  if (!userLogin) {
    return (
      <Routes>
        <Route path="/login" element={<Index />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // ===== CON SESIÓN =====
  const firstPath = routedMenus.length > 0
    ? normalizePath(
      "/"
  )
    : "/";

    const routers = routes;
  return (
    <Routes>
      {/* Layout con Navbar + Sidebar */}
      <Route
        element={
          <PersistentShell
            menus={userLogin.Menus}
            userName={userLogin?.Name || "Usuario"}
            onLogout={handleLogout}
          />
        }
      >
        {routers.map((item) => {
          // const element = pages[item.cod_menu as keyof typeof pages];
          const path = normalizePath(item.path);
          return (
            <Route
              key={`${item.path}-${path}`}
              path={path}
              element={item.element}
            />
          );
        })}

        <Route index element={<Navigate to={firstPath} replace />} />
      </Route>

      <Route path="/" element={<Navigate to={firstPath} replace />} />
      <Route path="*" element={<Navigate to={firstPath} replace />} />
    </Routes>
  );
}
