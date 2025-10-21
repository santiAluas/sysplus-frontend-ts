import BasePage from '@/componentesCommons/BasePage'
import UploadExcel from '@/componentesCommons/UploadExcel'
import { subirInventarioOpenBravoNuevoServiceWeb } from './services/SubirInventarioServiciosWeb'
import { useLoading } from '@/componentesCommons/LoadingContext';
import { showAlert } from '@/utils/modalAlerts';
import SubirPlantillaInventarioOpen from './components/SubirPlantillaInventarioOpen';

const IndexSubirInventarioOpen = () => {

  return (
    <BasePage title='Subir Inventario Open Bravo'>
        <SubirPlantillaInventarioOpen/>
    </BasePage>
  )
}

export default IndexSubirInventarioOpen