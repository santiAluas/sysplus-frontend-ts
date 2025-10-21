const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    UPLOAD_PRODUCT_INVENTARY: `${URL_BASE}InventarioFisico/upload-excel-inventary-product`,
    GET_AGENCIES_BY_EMPLOYEE: `${URL_BASE}InventarioFisico/get-agency-by-employee`,
    SEARCH_PRODUCT_INVENTORY: `${URL_BASE}InventarioFisico/search-product`,
    SAVE_PRODUCT_INVENTORY: `${URL_BASE}InventarioFisico/save-product-inventory`,
    CHECK_SAVE_PRODUCT: `${URL_BASE}InventarioFisico/check-save-producto`,
    PRODUCT_BY_ID: `${URL_BASE}InventarioFisico/product-x-id`,
    FINISH_AUDITORY: `${URL_BASE}InventarioFisico/finalizar-auditoria`,
    GET_AGENCY_FINISH_AUDITORY: `${URL_BASE}InventarioFisico/agency-finish-auditory`,
    REPORT_COUNT_INVENTORY: `${URL_BASE}DocumentsInventory/download-count-item-by-agencia`,
    REPORT_COUNT_INVENTORY_CIEGO: `${URL_BASE}DocumentsInventory/download-count-item-by-agencia-ciego`,
    REPORT_COUNT_NOT_AUDITED: `${URL_BASE}DocumentsInventory/download-count-item-not-audited`,

    REPORT_COUNT_NOT_AUDITED_MOTOS: `${URL_BASE}DocumentsInventory/download-count-item-not-audited-motos`,
    REPORT_COUNT_CONFORME_MOTOS: `${URL_BASE}DocumentsInventory/download-count-item-by-agencia-ciego-motos`,

    REPORT_EXCEL_INVENTORY: `${URL_BASE}DocumentsInventory/report-exel-item-inventory`,
    DOWNLOAD_ACTA_INVENTORY: `${URL_BASE}DocumentsInventory/download-act`,
    All_DESCRIPTIONS_PRODUCTS_ACTIVE: `${URL_BASE}InventarioFisico/get-descripcion-product-active`
}