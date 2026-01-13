import CustomDatePicker from "@/componentesCommons/CustomDatePicker"
import { Button, Typography } from "@mui/material"
import { useState } from "react"

interface Props {
  handlerSave?: (fecha:string) =>void
}
const CambiarFechaComponent = ({ handlerSave}: Props) => {
  const [fecha, setFecha] = useState<string>("");

  const handler = (item:string) =>{
      setFecha(item)
  }
  return (
    <>
        <Typography align="center" mb={2}> SELECCIONE NUEVA FECHA</Typography>
        <div>
          <CustomDatePicker onChangeValue={handler} label="Fecha para cambiar"/>
          <Button fullWidth onClick={() => handlerSave?.(fecha)} sx={{marginTop: 2, height: 35}}>Grabar</Button>
        </div>
    </>
  )
}

export default CambiarFechaComponent