import { CustomGridColumn } from "@/components/DataGridCrud/CustomGridCrud";
import { LiquidacionesTarjetasInDto } from "../Dtos/LiquidacionesTarjetasInDto";

export default class ConfiguracionLiquidacionTarjetaCreditoEditar {
  static columns(): CustomGridColumn<LiquidacionesTarjetasInDto>[] {
    return [
      {
        field: "fechaLiquidacion",
        headerName: "Fecha Liquidación",
        flex: 1.2,
        editableCrud: false,
        valueFormatter: (params: any) =>
          params.value
            ? new Date(params.value).toLocaleDateString()
            : "",
      },
      {
        field: "comercio",
        headerName: "Comercio",
        flex: 1.5,
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
        field: "valorPagado",
        headerName: "Valor Pagado",
        flex: 1,
        editableCrud: true,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "comision",
        headerName: "Comisión",
        flex: 1,
        editableCrud: true,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "retencionIva",
        headerName: "Retención IVA",
        flex: 1,
        editableCrud: true,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "retencionFte",
        headerName: "Retención Fuente",
        flex: 1,
        editableCrud: true,
        type: "number",
        valueFormatter: (params: any) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
    ];
  }
}