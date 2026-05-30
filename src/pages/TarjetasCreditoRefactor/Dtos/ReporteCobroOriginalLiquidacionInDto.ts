export interface ReporteCobroOriginalLiquidacionInDto {
  id: string;
  pago?: string;
  fechaOpen?: string;
  fechaTransaccion?: string;
  tercero?: string;
  comercio?: string;
  lote?: string;
  recap?: string;
  facturaCliente?: string;
  bancoProcesador?: string;
  usuario1?: string;
  importeDeposito?: string;
  totalCuotas?: number;
  numeroCuota?: number;
  pagoCuota?: number;
  estaPagado: boolean;
  cuotasLiquidadas: number;
  cuotasPendientes: number;
  totalLiquidado: number;
  valorPendiente: number;
}