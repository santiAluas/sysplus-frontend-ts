import BasePage from '@/componentesCommons/BasePage'
import { configureMicrofrontendAuth } from '@/CustomElements/auth/configureMicrofrontendAuth'

const ReporteComprobantePagoIndexs = () => {
  return (
    <BasePage>
        <mf-reporte-comprobantes ref={configureMicrofrontendAuth}
      style={{
        display: 'block',
        width: '100%',
        minHeight: '100%',
      }}/>
    </BasePage>
  )
}

export default ReporteComprobantePagoIndexs

