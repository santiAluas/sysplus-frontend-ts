import { useEffect, useState } from 'react'
import CustomAutocompleteTs from '../CustomAutocompleteTs'
import OpcionesList from '@/pages/FormularioAtm/models/OpcionesList'
import { ciudadesPlantillasMatriculacion } from './services/CiudadesMatriculacionServiceWeb'
import { useLoading } from '../LoadingContext'

interface Props {
  setCiudad: React.Dispatch<React.SetStateAction<any>>
}

const CiudadesMatriculacion = ({ setCiudad }: Props) => {
  const [ciudadesLista, setCiudadesLista] = useState<OpcionesList[] | []>([])
  const { startLoading, stopLoading } = useLoading();
  const seleccionarCiudad = (value: OpcionesList) => {
    setCiudad(value);
  }

  const cargarCiudades = async () => {
    try {
      startLoading()
      const respuesta = await ciudadesPlantillasMatriculacion();
      setCiudadesLista(respuesta);
    } finally{
      stopLoading();
    }
  }

  useEffect(() => {
    cargarCiudades();
  }, [])


  return (
    <CustomAutocompleteTs
      options={ciudadesLista}
      labelFullField="Seleccione la Ciudad"
      label='Ciudades'
      handleChange={(e, value: any) => seleccionarCiudad(value)}
    />
  )
}

export default CiudadesMatriculacion