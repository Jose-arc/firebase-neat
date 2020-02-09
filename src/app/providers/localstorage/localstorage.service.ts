import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  factura : any;
  facturaa : any;

  constructor() { }

  setFactura( object : any ) : void {

    this.factura = object;

    localStorage.setItem( 'factura', JSON.stringify( this.factura ) );

  }

  getFactura(){
    
    return localStorage.getItem( 'factura' );

  }

}
