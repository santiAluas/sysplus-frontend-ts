import CambioCaja from '../pages/CambioCaja';
import ReporteCobrosGestiones from '../pages/ReporteCobrosGestiones';
import ReporteGestionesWeb from '../pages/ReporteGestionesWeb';
import ReporteCallCenter from '../pages/ReporteCallCenter';
import ReporteAtimComercial from '../pages/ReporteAtimComercial';
import MatriculacionPage from '../pages/MatriculacionPage';
import ReporteCobrosGestionesView from '../pages/ReporteCobrosGestionesView';
import ReporteCuotaNoPagado from '../pages/ReporteCuotaNoPagado';
import AuraPage from '../pages/AuraPage';
import AnticiposMatriculacion from '../pages/AnticiposMatriculacion';
import LiquidacionAnticipo from '../pages/LiquidacionAnticipo';
import VerificacionesReporte from '../pages/VerificacionesReporte';
import ReporteActivacionMatricula from '../pages/ReporteActivacionMatricula';
import ReportePostVenta from '../pages/ReportePostVenta';
import ReporteLiquidaciones from '../pages/ReporteLiquidaciones';
import ReporteAnticipo from '../pages/ReporteAnticipo';
import ReImprimirLiquidacion from '../pages/ReImprimirLiquidacion';
import ReImprimirAnticipo from '../pages/ReImprimirAnticipo';
import AuditoriaStock from '../pages/AuditoriaStock';
import ReporteAuditoriaInventario from '../pages/ReporteAuditoriaInventario';
import AprobarDevolucion from '../pages/AprobarDevolucion';
import UploadExcelListPrice from '../pages/UploadExcelListPrice';
import ViewItemPrice from '../pages/ViewItemPrice';
import PagesCobrax from '../pages/PagesCobrax';
import UploadImageVef from '../pages/UploadImageVef';
import UploadProductListExcel from '../pages/UploadProductListExcel';
import ConsultInfoClientCredi from '../pages/ConsultInfoClientCredi';
import UpdateDocumentRamvPagados from '../pages/MatriculacionPages/UpdateDocumentRamvPagados';
import UploadExcelProvedor_BC from '../pages/ConsignacionesPage/UploadExcelProvedor_BC';
import UpdatePedidoCompra from '../pages/ConsignacionesPage/UpdatePedidoCompra';
import RecepcionBodegaConsignacion from '../pages/ConsignacionesPage/RecepcionBodegaConsignacion';
import SolicitudApropiacion from '../pages/ConsignacionesPage/SolicitudApropiacion';
import ControlMasterSolicitudApropiacion from '../pages/ConsignacionesPage/ControlMasterSolicitudApropiacion';
import InsertCompliance from '../pages/Administrativo/InsertCompliance';
import DashboardCC from '../pages/Administrativo/DashboardCC';
import ReportSysOB from '../pages/ConsignacionesPage/ReportSysOB';
import UpdateValueMatriculacion from '../pages/MatriculacionPages/UpdateValueMatriculacion';
import ReporteBodegasConsignacion from '../pages/ConsignacionesPage/ReporteBodegasConsignacion';
import ReporteExtractoBancario from '../pages/Contabilidad/ReporteExtractoBancario';
import ReporteCumplimientoAgencias from '../pages/Administrativo/ReporteCumplimientoAgencias';
import ReporteComportamientoPago from '../pages/CallCenter/ReporteComportamientoPago';
import TransferenciaItemsBodegas from '../pages/ConsignacionesPage/TransferenciaItemsBodegas';
import DarBajarItemApropiacion from '../pages/ConsignacionesPage/DarBajarItemApropiacion';
import ReporteProductoCostos from '../pages/ConsignacionesPage/ReporteProductoCostos';
import CobrosOpenBravo from '../pages/Administrativo/CobrosOpenBravo';
import Reporteapropiacionproducto from '../pages/Logistica/Reporteapropiacionproducto';
import ReporteUsuarioOracle from '../pages/ReportesOracle/ReporteUsuarioOracle';
import UploadExcelRetencionestc from '../pages/Contabilidad/UploadRetencionestc';
import CobrosLiquidadosPendientes from '../pages/Contabilidad/CobrosLiquidadosPendientes';
import LiquidacionesTarjetasCredito from '../pages/Contabilidad/LiquidacionesTarjetasCredito';
import InventarioCiego from '../pages/Inventario/InventarioCiego';
import TransformarExtractoExcelToCsv from '../pages/Contabilidad/TransformarExtractoExcelToCsv';
import UploadImagesCobrax from '../pages/Cartera/UploadImagesCobrax';
import ReporteGeneral from '../pages/ReporteGeneral';
import CargarGestionesIndex from '@/pages/CargarGestionesPage/CargarGestionesIndex';
import AdministrarAnticiposMatriculaIndex from '@/pages/AdministradorAnticipos/AdministrarAnticiposMatriculaIndex';
import CashBackDeUdaIndex from '@/pages/SubirCashBackDeUdaPage/CashBackDeUdaIndex';
import { Dashboard } from '@/pages/Dashboard';

export  const pages = {
    'DASHBOARD': <Dashboard />,
    'CambioCaja': <CambioCaja/>,
    'Index': <ReporteGestionesWeb/>,
    'ReporteCobrosGestiones':<ReporteCobrosGestiones/>,
    'ReporteGestionesPureCloud':<ReporteCallCenter/>,
    'ReporteAtimComercial':<ReporteAtimComercial/>,
    'ReporteMatriculacion':<MatriculacionPage/>,
    'ReporteCobrosGestionesSearch':<ReporteCobrosGestionesView/>,
    'ReporteCobrosCuotaCero':<ReporteCuotaNoPagado/>,
    'AuraPage':<AuraPage/>,
    'AnticipoMatricula':<AnticiposMatriculacion/>,
    'LiquidacionMatricula':<LiquidacionAnticipo/>,
    'VerificacionesReporte':<VerificacionesReporte/>,
    'ReporteActivacionMatricula':<ReporteActivacionMatricula/>,
    'ReportePostVenta':<ReportePostVenta/>,
    'ReporteLiquidaciones':<ReporteLiquidaciones/>,
    'ReImprimirLiquidacion':<ReImprimirLiquidacion/>,
    'ReImprimirAnticipos':<ReImprimirAnticipo/>,
    'ReporteAnticipo':<ReporteAnticipo/>,
    'revisar-imagenes':<ReporteAnticipo/>,


    'AuditoriaStockNormal':<AuditoriaStock tipoTomaFisica={2}/>,
    'AuditoriaStockCiego':<InventarioCiego/>, //tipos 1=Normal, 2=Ciego
    'AuditoriaInventario': <ReporteAuditoriaInventario/>,
    'AprobarDevolucion': <AprobarDevolucion/>,
    'ListPriceView': <ViewItemPrice/>,
    'UploadListPrice': <UploadExcelListPrice/>,
    'PageCobrax': <PagesCobrax/>,
    'UploadImageVef': <UploadImageVef/>,
    'UploadExcelProdAu': <UploadProductListExcel/>,
    'CreditRequest': <ConsultInfoClientCredi/>,
    'InfoMatriculacion': <UpdateDocumentRamvPagados/>,
    'UploadExcelBC': <UploadExcelProvedor_BC/>,
    'UploadExcelPedidoCompra': <UpdatePedidoCompra/>,
    'RecepcionBodegaConsignacion': <RecepcionBodegaConsignacion/>,
    'SolicitudApropiacion': <SolicitudApropiacion/>,
    'ControlMasterSolicitudApropiacion': <ControlMasterSolicitudApropiacion/>,
    'IngresoMetasAgengias': <InsertCompliance/>,
    'ReportWereHouseSysOB': <ReportSysOB/>,
    'UpdateValueAnticipo': <UpdateValueMatriculacion/>,
    'REPORTEEXTRACTOBANCARIO': <ReporteExtractoBancario/>,
    'ReporteBodegaConsignacion': <ReporteBodegasConsignacion/>,
    'ReporteCompromisosXZonas': <ReporteCumplimientoAgencias/>,
    'ReporteComportamientoPago': <ReporteComportamientoPago/>,
    'ReporteUsuarioOracle': <ReporteUsuarioOracle/>,
    'TransferenciasItemsEntreBodegas': <TransferenciaItemsBodegas/>,
    'DarBajarItemApropiacion': <DarBajarItemApropiacion/>,
    'ReporteProductoCostos': <ReporteProductoCostos/>,
    'CobrosOpenBravo': <CobrosOpenBravo/>,
    'ReporteApropiacionProducto': <Reporteapropiacionproducto/>,
    'UploadExcelRetencionestc': <UploadExcelRetencionestc/>,
    'CobrosLiquidadosPendientes': <CobrosLiquidadosPendientes/>,
    'LiquidacionesTarjetasCredito': <LiquidacionesTarjetasCredito/>,
    'TransformarExtractoExcelToCsv': <TransformarExtractoExcelToCsv/>,
    'UploadImagesCobrax': <UploadImagesCobrax/>,
    'upload-gestores': <CargarGestionesIndex/>,
    'gestionar-liquidacion': <AdministrarAnticiposMatriculaIndex/>,
    'subir-cashback-deuna': <CashBackDeUdaIndex/>,
    'ReporteGeneralAlbaran': <ReporteGeneral title='Inventario Albaran' tipoReporte='REPORT_EXCEL_INVENTARIO_ALBARAN' departamento='Contabilidad'/>,
    'ReporteGeneralProveedor': <ReporteGeneral title='Inventario Factura Proveedor' tipoReporte='REPORT_EXCEL_FACTURA_PROVEEDOR'  departamento='Contabilidad'/>,
    'ReporteGeneralcontable': <ReporteGeneral title='Inventario Cartera Contable' conrangofechas={false} tipoReporte='REPORT_EXCEL_CARTERA_CONTABLE'  departamento='Contabilidad'/>,
    'ReporteInventarioGeneral': <ReporteGeneral title='Inventario reporte general' conrangofechas={false} tipoReporte='REPORT_EXCEL_INVENTARIO_ACTUAL'  departamento='Contabilidad'/>

  };