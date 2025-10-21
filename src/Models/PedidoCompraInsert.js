export class PedidoCompraCabecera {
    constructor(c_bpartner_id, ad_org_id, descripcion, usuario, pedidoCompraDetalles) {
        this.c_bpartner_id = c_bpartner_id;
        this.ad_org_id = ad_org_id;
        this.descripcion = descripcion;
        this.usuario = usuario;
        this.pedidoCompraDetalles = pedidoCompraDetalles;
    }
}

export class PedidoCompraDetalle {
    constructor(m_product_id, cantidad, atributos, ad_org_destino) {
        this.m_product_id = m_product_id;
        this.cantidad = cantidad;
        this.atributos = atributos;
        this.ad_org_destino = ad_org_destino;
    }
}