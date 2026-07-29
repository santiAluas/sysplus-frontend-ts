import { useEffect } from "react";
import InventarioCiegoCompoenent from "../components/InventarioCiegoCompoenent";
import InventarioCiegoItemHook from "./InventarioCiegoHook";

const InventarioCiegoItem = ({ userLogin, seleccionarAgencia }) => {
  const inventarioItem = InventarioCiegoItemHook({
    userLogin,
    seleccionarAgencia
  });

  useEffect(() => {
    console.log(inventarioItem)
  }, [])
  
  return (userLogin ? <InventarioCiegoCompoenent inventario={inventarioItem} /> : "CARGANDO ...");
};

export default InventarioCiegoItem;