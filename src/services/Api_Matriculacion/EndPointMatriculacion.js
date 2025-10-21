const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    UPLOAD_DOCUMENT_RAMVS_PAGADOS: `${URL_BASE}InventarioFisico/upload-excel-inventary-product`,
    DOWNLOAD_REPORT_RAMVS_PAID: `${URL_BASE}InventarioFisico/get-agency-by-employee`,
    SEARCH_ANTICIPO_MATRICULACION: `${URL_BASE}AnticipoMatricula/search-anticipo-matriculacion`,
    UPDATE_VALUE_ANTICIPO_MATRICULACION: `${URL_BASE}AnticipoMatricula/update-price-matriculacion`,
}