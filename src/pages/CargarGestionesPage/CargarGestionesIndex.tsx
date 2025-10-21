import BasePage from "@/componentesCommons/BasePage"
import SubirExcelGestores from "./pages/SubirExcelGestores";

const CargarGestionesIndex = () => {
  const routes = [{ text: "subida masiva de gestores" }];
  return (
    <BasePage routers={routes} title="Subir Gestores">
       <SubirExcelGestores/>
    </BasePage>
  )
}

export default CargarGestionesIndex