import { CustomGridColumn } from "@/components/DataGridCrud/CustomGridCrud";
import { ReporteCobroOriginalLiquidacionInDto } from "../Dtos/ReporteCobroOriginalLiquidacionInDto";

export default class ConfiguracionReporteCobroOriginalLiquidacion {
  static columns(): CustomGridColumn<ReporteCobroOriginalLiquidacionInDto>[] {
    return [
      {
        field: "pago",
        headerName: "Pago",
        flex: 2,
        editableCrud: false,
      },
      {
        field: "fecha_open",
        headerName: "Fecha Open",
        flex: 1.7,
        editableCrud: false,
        valueFormatter: (params: any) =>
          params.value
            ? new Date(params.value).toLocaleDateString()
            : "",
      },
      {
        field: "fecha_transaccion",
        headerName: "Fecha Transacción",
        flex: 1.7,
        editableCrud: false,
        valueFormatter: (params: any) =>
          params.value
            ? new Date(params.value).toLocaleDateString()
            : "",
      },
      {
        field: "tercero",
        headerName: "Tercero",
        flex: 1,
        editableCrud: false,
        minWidth: 180,
      },
      {
        field: "comercio",
        headerName: "Comercio",
        flex: 2,
        editableCrud: false,
      },
      {
        field: "lote",
        headerName: "Lote",
        flex: 1,
        editableCrud: false,
      },
      {
        field: "recap",
        headerName: "Recap",
        flex: 1,
        editableCrud: false,
      },
      {
        field: "factura_cliente",
        headerName: "Factura Cliente",
        flex: 1.7,
        editableCrud: false,
      },
      {
        field: "banco_procesador",
        headerName: "Banco Procesador",
        flex: 1.5,
        editableCrud: false,
      },
      {
        field: "usuario_1",
        headerName: "Usuario",
        flex: 2,
        editableCrud: false,
      },
      {
        field: "importe_deposito",
        headerName: "Importe Depósito",
        flex: 1.2,
        editableCrud: false,
      },
      {
        field: "total_cuotas",
        headerName: "Total Cuotas",
        flex: 1,
        editableCrud: false,
        type: "number",
      },
      {
        field: "numero_cuota",
        headerName: "N° Cuota",
        flex: 1,
        editableCrud: false,
        type: "number",
      },
      {
        field: "pago_cuota",
        headerName: "Pago Cuota",
        flex: 1.2,
        editableCrud: false,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "esta_pagado",
  headerName: "Está Pagado",
  flex: 1,
  editableCrud: false,
  valueFormatter: (params: any) =>
    params.value ? "Sí" : "No",
      },
      {
        field: "cuotas_liquidadas",
        headerName: "Cuotas Liquidadas",
        flex: 1.2,
        editableCrud: false,
        type: "number",
      },
      {
        field: "cuotas_pendientes",
        headerName: "Cuotas Pendientes",
        flex: 1.2,
        editableCrud: false,
        type: "number",
      },
      {
        field: "total_liquidado",
        headerName: "Total Liquidado",
        flex: 1.3,
        editableCrud: false,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "valor_pendiente",
        headerName: "Valor Pendiente",
        flex: 1.3,
        editableCrud: false,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
    ];
  }
}