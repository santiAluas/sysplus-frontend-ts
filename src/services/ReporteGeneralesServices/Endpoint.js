const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    REPORT_EXCEL_CARTERA_CONTABLE: `${URL_BASE}ReportesContabilidad/reporte-cartera-contable`,
    REPORT_EXCEL_INVENTARIO_ALBARAN: `${URL_BASE}ReportesContabilidad/reporte-inventario-fa-albaran` ,
    REPORT_EXCEL_FACTURA_PROVEEDOR: `${URL_BASE}ReportesContabilidad/reporte-factura-proveedor` ,
    REPORT_EXCEL_INVENTARIO_ACTUAL: `${URL_BASE}ReportesContabilidad/reporte-inventario-actual` ,

}