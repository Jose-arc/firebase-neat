export class Factura {
    constructor(
      public codigo: string,
      public producto: string,
      public unidades: string,
      public kilos : string,
      public precio: string,
      public descripcion: string,
      public estado: string
    ) {}
  }