const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    SEARCH_CLIENT_INFO_GARANCHECK: `${URL_BASE}GaranCheck/information-client`,
    SAVE_CLIENT_CREDIT_INFO: `${URL_BASE}GaranCheck/save-info-user`,
    SAVE_CREDIT_INFO: `${URL_BASE}GaranCheck/save-credit-info`,
    INFO_INEC: `${URL_BASE}GaranCheck/get-vital-basket-INEC`,
    INFO_CREDIT: `${URL_BASE}GaranCheck/info-credit-by-user`,
    DOWNLOAD_DOCUMENT_CREDIT: `${URL_BASE}GaranCheck/download-document-credit` 
}