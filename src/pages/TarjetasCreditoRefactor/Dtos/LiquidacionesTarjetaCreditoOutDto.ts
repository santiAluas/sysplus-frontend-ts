export interface LiquidacionesTarjetaCreditoOutDto {
  id?: string;
  fechaLiquidacion?: string;
  comercio?: string;
  lote?: string;
  recap?: string;
  valorPagado?: number;
  comision?: number;
  retencionIva?: number;
  retencionFte?: number;
}