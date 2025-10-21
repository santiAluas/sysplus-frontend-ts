const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    UPLOAD_INITIAL_DAY: `${URL_BASE}CompromisoAgencias/save-initial-day`,
    UPLOAD_FINISH_DAY: `${URL_BASE}CompromisoAgencias/save-finish-day`, 
    CHECK_INITIAL_PAGE: `${URL_BASE}CompromisoAgencias/check-update-time-offside`, 
    GET_ALL_EMPLOYEE_AGENCY: `${URL_BASE}CompromisoAgencias/report-employee-agency`, 
    GET_ALL_AGENCY: `${URL_BASE}CompromisoAgencias/report-by-agency`, 
    INFO_DATE_REGISTER: `${URL_BASE}CompromisoAgencias/info-save-data-report`,
    REPORT_EMPLOYEE_ORDER: `${URL_BASE}CompromisoAgencias/report-employee-order`,
    REPORT_EXCEL_COMPROMISOS: `${URL_BASE}CompromisoAgencias/download-excel-comprimisos-range-date`,

    GENERAR_COBRO_OB: `${URL_BASE}ServiciosWebTerceros/cobros-open-bravo`,
}