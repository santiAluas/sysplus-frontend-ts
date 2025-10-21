const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    REPORT_EXCEL_EXTRACTOBANCARIO: `${URL_BASE}ReportesContabilidad/reporte-extractos-bancarios`,
    UPLODAD_RETENCIONES: `${URL_BASE}ContabilidadTC/upload-excel-retencion-tc` ,
    RETORNAR_COLUMNAS_REPORTES_TC: `${URL_BASE}ContabilidadTC/retornar-columnas-reporte`,
    RETORNAR_BANCOS_EMISORES: `${URL_BASE}ContabilidadTC/obtener-bancos-reportes`,
    REPORTE_CORBOS_TARJETAS: `${URL_BASE}ContabilidadTC/reporte-cobros-tarjetas`,
    REPORTE_CORBOS_TARJETAS_EXCEL: `${URL_BASE}ContabilidadTC/reporte-cobros-tarjetas-excel`,
    BUSCAR_FACTURAS: `${URL_BASE}ContabilidadTC/buscador-facturas-liquidacion`,
    BUSCAR_RETENCIONES: `${URL_BASE}ContabilidadTC/buscador-retenciones-liquidacion`,
    BUSCAR_EXTRACTO: `${URL_BASE}ContabilidadTC/buscador-extracto-liquidacion`,
    BUSCAR_LOTE_SW: `${URL_BASE}ContabilidadTC/buscador-lote`,
    GRABAR_LIQUIDACION: `${URL_BASE}ContabilidadTC/grabar-liquidacion`,
    LIQUIDACION_CODIGO: `${URL_BASE}ContabilidadTC/buscar-liquidacion`,
    SECUENCIAL_LIQUIDACIONES: `${URL_BASE}ContabilidadTC/obtener-secuencial`,
    DESCARGAR_DATOS_OPEN_BRAVO_EXTRACTO: `${URL_BASE}ContabilidadTC/descargar-csv-extracto-bancario-open`,
    EXCEL_SUBIR_VALORES_LOTES: `${URL_BASE}ContabilidadTC/subir-excel-valores-cobros-lotes`,

}