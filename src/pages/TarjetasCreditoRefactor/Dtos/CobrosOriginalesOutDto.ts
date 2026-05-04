interface CobrosOriginalesOutDto {
  pago?: string;
  fechaOpen?: Date;
  fechaTransaccion?: Date;
  tercero?: string;
  comercio?: string;
  lote?: string;
  recap?: string;
  importeDeposito?: number;
  facturaCliente?: string;
  bancoProcesador?: string;
  usuario1?: string;
  totalCuotas?: number;

}

export default CobrosOriginalesOutDto;