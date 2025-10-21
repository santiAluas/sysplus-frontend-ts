class Liquidacion {
    constructor(tipoLiquidacion, valor = 0, file = null) {
      this.tipoLiquidacion = tipoLiquidacion;
      this.valor = valor;
      this.file = file;
    }
  
    toString() {
      return `Tipo de Liquidación: ${this.tipoLiquidacion}, Valor: ${this.valor}, Archivo: ${this.file || 'Ningún archivo'}`;
    }
  }

  export default Liquidacion;