const URL_BASE = import.meta.env.VITE_REACT_APP_BASE_URL;
export const END_POINTS ={
    UPLOAD_PRODUCT_INVENTARY: `${URL_BASE}BodegasConsignacion/upload-excel-model-proveedor`,
    UPDATE_ITEM_WHEREHOUSE : `${URL_BASE}BodegasConsignacion/update-wherehouse-transfer`,
    SEARCH_PRODUCT_TRANSFER_WHEREHOUSE: `${URL_BASE}BodegasConsignacion/search-item-transfer`,
    UPLOAD_PRODUCT_COST: `${URL_BASE}BodegasConsignacion/upload-excel-model-product-cost`,
    UPLOAD_PEDIDO_COMPRA: `${URL_BASE}PedidoCompra/upload-excel-pedido-compra`,
    ALL_PEDIDOS_VENTA: `${URL_BASE}PedidoCompra/all-products-pedido-compra`,
    SEARCH_PEDIDOS_VENTA: `${URL_BASE}PedidoCompra/search-product-pedido-compra`, 
    SAVE_PEDIDOS_COMPRA: `${URL_BASE}PedidoCompra/save-receptar-pedido-venta`, 

    ALL_SOLICITUD_APROPIACION: `${URL_BASE}SolicitudApropiacion/all-solicitudes-apropacion`, 
    SAVE_SOLICITUD_APROPIACION: `${URL_BASE}SolicitudApropiacion/save-solicitudes-apropacion`, 

    ALL_SOLICITUD_APROPIACION_X_APROBACION: `${URL_BASE}ControlSolicitudesApropiacion/all-solicitudes-apropiacion-x-aprobar`, 
    UPDATE_SOLICITUD_APROPIACION_X_APROBACION: `${URL_BASE}ControlSolicitudesApropiacion/update-solicitud-apropiacion`, 

    REPORT_CONSIGNACION_PROPIEDAD: `${URL_BASE}ReporteBodegasConsignacion/reporte-cp`,  
    REPORT_BODEGA_CONSIG_PROPIEDAD_AGENCIAS: `${URL_BASE}ReporteBodegasConsignacion/report-excel-wherehouse`,
    REPORT_PRODUCT_COST: `${URL_BASE}ReporteBodegasConsignacion/report-product-cost`,

    SEARCH_ITEM_DAR_BAJA: `${URL_BASE}AnularPedidoCompra/search-item-for-cancel-pedido-compra`,
    DAR_BAJA_ITEM_PEDIDO_COMPRA: `${URL_BASE}AnularPedidoCompra/dar-baja-pedido-compra`,
}