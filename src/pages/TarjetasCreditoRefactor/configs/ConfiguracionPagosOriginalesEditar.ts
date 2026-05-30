import { CustomGridColumn } from "@/components/DataGridCrud/CustomGridCrud";
import CobrosOriginalesInDto from "../Dtos/CobrosOriginalesInDto";

export default class ConfiguracionPagosOriginalesEditar {
  static columns(): CustomGridColumn<CobrosOriginalesInDto>[] {
    return [
      {
        field: "pago",
        headerName: "Pago",
        flex: 1,
        editableCrud: false,
      },
      {
        field: "fechaOpen",
        headerName: "Fecha Open",
        flex: 1,
        editableCrud: false,
        valueFormatter: (params:any) =>
          params.value
            ? new Date(params.value).toLocaleDateString()
            : "",
      },
      {
        field: "fechaTransaccion",
        headerName: "Fecha Transacción",
        flex: 1,
        editableCrud: false,
        valueFormatter: (params:any) =>
          params.value
            ? new Date(params.value).toLocaleDateString()
            : "",
      },
      {
        field: "tercero",
        headerName: "Tercero",
        flex: 1.5,
        editableCrud: false,
      },
      {
        field: "comercio",
        headerName: "Comercio",
        flex: 1.5,
        editableCrud: true,
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
        field: "importeDeposito",
        headerName: "Importe Depósito",
        flex: 1,
        editableCrud: false,
        type: "number",
        valueFormatter: (params) =>
          params.value != null
            ? Number(params.value).toFixed(2)
            : "",
      },
      {
        field: "facturaCliente",
        headerName: "Factura Cliente",
        flex: 1.5,
        editableCrud: false,
      },
      {
        field: "bancoProcesador",
        headerName: "Banco Procesador",
        flex: 1.5,
        editableCrud: false,
      },
      {
        field: "usuario1",
        headerName: "Usuario",
        flex: 1,
        editableCrud: false,
      },
      {
        field: "totalCuotas",
        headerName: "Total Cuotas",
        flex: 1,
        editableCrud: false,
        type: "number",
      },
    ];
  }
}