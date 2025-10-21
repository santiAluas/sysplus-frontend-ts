import CargarGestionesIndex from "@/pages/CargarGestionesPage/CargarGestionesIndex";
import DashboardCC from "../pages/Administrativo/DashboardCC";
import InsertCompliance from "../pages/Administrativo/InsertCompliance";
import AnticiposMatriculacion from "../pages/AnticiposMatriculacion";
import AnulacionAnticipos from "../pages/AnulacionAnticipos";
import AprobarDevolucion from "../pages/AprobarDevolucion";
import AuditoriaStock from "../pages/AuditoriaStock";
import RequestTransfer from "../pages/ConsignacionesPage/RequestTransfer";
import ConsultInfoClientCredi from "../pages/ConsultInfoClientCredi";
import { Dashboard } from "../pages/Dashboard";
import EncuestaAura from "../pages/EncuestaAura";
import EncuestaPostVenta from "../pages/EncuestaPostVenta";
import GraciasEncuesta from "../pages/GraciasEncuesta";
import GraciasEncuestaPostVenta from "../pages/GraciasEncuestaPostVenta";
import { Index } from "../pages/Index";
import LiquidacionAnticipo from "../pages/LiquidacionAnticipo";
import UpdateDocumentRamvPagados from "../pages/MatriculacionPages/UpdateDocumentRamvPagados";
import RegistroGarantia from "../pages/RegistroGarantia";
import ReporteAuditoriaInventario from "../pages/ReporteAuditoriaInventario";
import ReporteCartera from "../pages/ReporteCartera";
import UploadExcelListPrice from "../pages/UploadExcelListPrice";
import ViewItemPrice from "../pages/ViewItemPrice";
import CambioCaja from "@/pages/CambioCaja";
import ReporteCobrosGestiones from "@/pages/ReporteCobrosGestiones";
import ReporteCallCenter from "@/pages/ReporteCallCenter";
import ReporteAtimComercial from "@/pages/ReporteAtimComercial";
import MatriculacionPage from "@/pages/MatriculacionPage";
import ReporteCobrosGestionesView from "@/pages/ReporteCobrosGestionesView";
import ReporteCuotaNoPagado from "@/pages/ReporteCuotaNoPagado";
import AuraPage from "@/pages/AuraPage";
import VerificacionesReporte from "@/pages/VerificacionesReporte";
import ReporteActivacionMatricula from "@/pages/ReporteActivacionMatricula";
import ReportePostVenta from "@/pages/ReportePostVenta";
import ReporteLiquidaciones from "@/pages/ReporteLiquidaciones";
import ReImprimirLiquidacion from "@/pages/ReImprimirLiquidacion";
import ReImprimirAnticipo from "@/pages/ReImprimirAnticipo";
import ReporteAnticipo from "@/pages/ReporteAnticipo";
import PagesCobrax from "@/pages/PagesCobrax";
import UploadImageVef from "@/pages/UploadImageVef";
import UploadProductListExcel from "@/pages/UploadProductListExcel";
import UploadExcelProvedor_BC from "@/pages/ConsignacionesPage/UploadExcelProvedor_BC";
import UpdatePedidoCompra from "@/pages/ConsignacionesPage/UpdatePedidoCompra";
import RecepcionBodegaConsignacion from "@/pages/ConsignacionesPage/RecepcionBodegaConsignacion";
import SolicitudApropiacion from "@/pages/ConsignacionesPage/SolicitudApropiacion";
import ControlMasterSolicitudApropiacion from "@/pages/ConsignacionesPage/ControlMasterSolicitudApropiacion";
import ReportSysOB from "@/pages/ConsignacionesPage/ReportSysOB";
import UpdateValueMatriculacion from "@/pages/MatriculacionPages/UpdateValueMatriculacion";
import ReporteExtractoBancario from "@/pages/Contabilidad/ReporteExtractoBancario";
import ReporteBodegasConsignacion from "@/pages/ConsignacionesPage/ReporteBodegasConsignacion";
import ReporteCumplimientoAgencias from "@/pages/Administrativo/ReporteCumplimientoAgencias";
import ReporteComportamientoPago from "@/pages/CallCenter/ReporteComportamientoPago";
import ReporteUsuarioOracle from "@/pages/ReportesOracle/ReporteUsuarioOracle";
import TransferenciaItemsBodegas from "@/pages/ConsignacionesPage/TransferenciaItemsBodegas";
import DarBajarItemApropiacion from "@/pages/ConsignacionesPage/DarBajarItemApropiacion";
import ReporteProductoCostos from "@/pages/ConsignacionesPage/ReporteProductoCostos";
import CobrosOpenBravo from "@/pages/Administrativo/CobrosOpenBravo";
import Reporteapropiacionproducto from "@/pages/Logistica/Reporteapropiacionproducto";
import UploadExcelRetencionestc from "@/pages/Contabilidad/UploadRetencionestc";
import CobrosLiquidadosPendientes from "@/pages/Contabilidad/CobrosLiquidadosPendientes";
import LiquidacionesTarjetasCredito from "@/pages/Contabilidad/LiquidacionesTarjetasCredito";
import TransformarExtractoExcelToCsv from "@/pages/Contabilidad/TransformarExtractoExcelToCsv";
import UploadImagesCobrax from "@/pages/Cartera/UploadImagesCobrax";
import InventarioCiego from "@/pages/Inventario/InventarioCiego";
import AdministrarAnticiposMatriculaIndex from "@/pages/AdministradorAnticipos/AdministrarAnticiposMatriculaIndex";
import CashBackDeUdaIndex from "@/pages/SubirCashBackDeUdaPage/CashBackDeUdaIndex";
import ReporteGeneral from "@/pages/ReporteGeneral";
import IndexSubirInventarioOpen from "@/pages/UploadPlantillaExcel/SubirInventarioOpen/IndexSubirInventarioOpen";

export const routes = [
  
  { path: "/", element: <Index /> },
  { path: "/subir-inventario-open", element: <IndexSubirInventarioOpen /> },
  { path: "/REGISTER-GARANTIA", element: <RegistroGarantia /> },
  { path: "/ENCUESTA-GARANTIA", element: <EncuestaAura /> },
  { path: "/GRACIAS", element: <GraciasEncuesta /> },
  { path: "/GRACIAS-POST-VENTA", element: <GraciasEncuestaPostVenta /> },
  { path: "/Anticipo-Matriculacion", element: <AnticiposMatriculacion /> },
  { path: "/Encuesta-PostVenta", element: <EncuestaPostVenta /> },
  { path: "/Liquidcion-Matriculacion", element: <EncuestaPostVenta /> },
  { path: "/Reporte-Cartera", element: <ReporteCartera /> },
  { path: "/REIMPRIMIR", element: <LiquidacionAnticipo /> },
  { path: "/DEVOLUCION-APROBAR", element: <AprobarDevolucion /> },
  { path: "/AUDITORIA-STOCK", element: <AuditoriaStock /> },
  { path: "/AuditoriaStockCiego", element: <InventarioCiego /> },
  { path: "/reporte-STOCK", element: <ReporteAuditoriaInventario /> },
  { path: "/view-item-price", element: <ViewItemPrice /> },
  { path: "/upload-list-price", element: <UploadExcelListPrice /> },
  { path: "/consult-info-client", element: <ConsultInfoClientCredi /> },
  { path: "/consignaciones-bodega", element: <RequestTransfer /> },
  { path: "/info-matriculacion", element: <UpdateDocumentRamvPagados /> },
  { path: "/page-tester", element: <DashboardCC /> },
  { path: "/upload-gestores", element: <CargarGestionesIndex /> },
  { path: "/gestionar-liquidacion", element: <AdministrarAnticiposMatriculaIndex /> },
  { path: "/subir-cashback-deuna", element: <CashBackDeUdaIndex /> },

  // ====== Claves originales ======
  { path: "/CambioCaja", element: <CambioCaja /> },
  { path: "/Index", element: <Index /> },
  { path: "/ReporteCobrosGestiones", element: <ReporteCobrosGestiones /> },
  { path: "/ReporteGestionesPureCloud", element: <ReporteCallCenter /> },
  { path: "/ReporteAtimComercial", element: <ReporteAtimComercial /> },
  { path: "/ReporteMatriculacion", element: <MatriculacionPage /> },
  { path: "/ReporteCobrosGestionesSearch", element: <ReporteCobrosGestionesView /> },
  { path: "/ReporteCobrosCuotaCero", element: <ReporteCuotaNoPagado /> },
  { path: "/AuraPage", element: <AuraPage /> },
  { path: "/AnticipoMatricula", element: <AnticiposMatriculacion /> },
  { path: "/LiquidacionMatricula", element: <LiquidacionAnticipo /> },
  { path: "/VerificacionesReporte", element: <VerificacionesReporte /> },
  { path: "/ReporteActivacionMatricula", element: <ReporteActivacionMatricula /> },
  { path: "/ReportePostVenta", element: <ReportePostVenta /> },
  { path: "/ReporteLiquidaciones", element: <ReporteLiquidaciones /> },
  { path: "/ReImprimirLiquidacion", element: <ReImprimirLiquidacion /> },
  { path: "/ReImprimirAnticipos", element: <ReImprimirAnticipo /> },
  { path: "/ReporteAnticipo", element: <ReporteAnticipo /> },
  { path: "/AuditoriaStockNormal", element: <AuditoriaStock tipoTomaFisica={2} /> },
  { path: "/AuditoriaStockCiego", element: <InventarioCiego /> },
  { path: "/AuditoriaInventario", element: <ReporteAuditoriaInventario /> },
  { path: "/AprobarDevolucion", element: <AprobarDevolucion /> },
  { path: "/ListPriceView", element: <ViewItemPrice /> },
  { path: "/UploadListPrice", element: <UploadExcelListPrice /> },
  { path: "/PageCobrax", element: <PagesCobrax /> },
  { path: "/UploadImageVef", element: <UploadImageVef /> },
  { path: "/UploadExcelProdAu", element: <UploadProductListExcel /> },
  { path: "/CreditRequest", element: <ConsultInfoClientCredi /> },
  { path: "/InfoMatriculacion", element: <UpdateDocumentRamvPagados /> },
  { path: "/UploadExcelBC", element: <UploadExcelProvedor_BC /> },
  { path: "/UploadExcelPedidoCompra", element: <UpdatePedidoCompra /> },
  { path: "/RecepcionBodegaConsignacion", element: <RecepcionBodegaConsignacion /> },
  { path: "/SolicitudApropiacion", element: <SolicitudApropiacion /> },
  { path: "/ControlMasterSolicitudApropiacion", element: <ControlMasterSolicitudApropiacion /> },
  { path: "/IngresoMetasAgengias", element: <InsertCompliance /> },
  { path: "/DashboardAdministrativoCC", element: <DashboardCC /> },
  { path: "/ReportWereHouseSysOB", element: <ReportSysOB /> },
  { path: "/UpdateValueAnticipo", element: <UpdateValueMatriculacion /> },
  { path: "/REPORTEEXTRACTOBANCARIO", element: <ReporteExtractoBancario /> },
  { path: "/ReporteBodegaConsignacion", element: <ReporteBodegasConsignacion /> },
  { path: "/ReporteCompromisosXZonas", element: <ReporteCumplimientoAgencias /> },
  { path: "/ReporteComportamientoPago", element: <ReporteComportamientoPago /> },
  { path: "/ReporteUsuarioOracle", element: <ReporteUsuarioOracle /> },
  { path: "/TransferenciasItemsEntreBodegas", element: <TransferenciaItemsBodegas /> },
  { path: "/DarBajarItemApropiacion", element: <DarBajarItemApropiacion /> },
  { path: "/ReporteProductoCostos", element: <ReporteProductoCostos /> },
  { path: "/CobrosOpenBravo", element: <CobrosOpenBravo /> },
  { path: "/ReporteApropiacionProducto", element: <Reporteapropiacionproducto /> },
  { path: "/UploadExcelRetencionestc", element: <UploadExcelRetencionestc /> },
  { path: "/CobrosLiquidadosPendientes", element: <CobrosLiquidadosPendientes /> },
  { path: "/LiquidacionesTarjetasCredito", element: <LiquidacionesTarjetasCredito /> },
  { path: "/TransformarExtractoExcelToCsv", element: <TransformarExtractoExcelToCsv /> },
  { path: "/UploadImagesCobrax", element: <UploadImagesCobrax /> },

  // Reportes Generales
  { path: "/ReporteGeneralAlbaran", element: <ReporteGeneral title="Inventario Albaran" tipoReporte="REPORT_EXCEL_INVENTARIO_ALBARAN" departamento="Contabilidad" /> },
  { path: "/ReporteGeneralProveedor", element: <ReporteGeneral title="Inventario Factura Proveedor" tipoReporte="REPORT_EXCEL_FACTURA_PROVEEDOR" departamento="Contabilidad" /> },
  { path: "/ReporteGeneralcontable", element: <ReporteGeneral title="Inventario Cartera Contable" conrangofechas={false} tipoReporte="REPORT_EXCEL_CARTERA_CONTABLE" departamento="Contabilidad" /> },
  { path: "/ReporteInventarioGeneral", element: <ReporteGeneral title="Inventario reporte general" conrangofechas={false} tipoReporte="REPORT_EXCEL_INVENTARIO_ACTUAL" departamento="Contabilidad" /> },
];
 