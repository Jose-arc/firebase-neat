import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getMessage(mensaje: any, icono: any, tituloAlerta: string){
    return Swal.fire({
      allowOutsideClick: false,
      icon: icono,
      title: tituloAlerta,
      text: mensaje
    });
  }

  addLocalStorage( parametro: string, variable: any ){
    localStorage.setItem( parametro , variable );
  }
}
