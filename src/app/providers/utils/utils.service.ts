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

  showPrimerLogin( email : string ){
    Swal.fire({
      title: `<strong>Bienvenido ${ email } </strong>`,
      icon: 'info',
      html:
        '<p>Este modal solamente se mostrara en su primer ingreso</p>' +
        '<p>Muchas gracias.</p>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Entendido',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
    // then ( function () {
    //   console.log("se mostro el modal"); 
    // });
  }

  
}
