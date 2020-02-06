import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../modelos/usuario.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from '../../providers/utils/utils.service';
import { SesionService } from '../../providers/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : UsuarioModel
  recordarme = true;

  constructor(private sesion : SesionService,
              private router : Router,
              private utils : UtilsService ) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ){

    if( form.invalid ){ return; }

    this.utils.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this.sesion.nuevoUsuario( this.usuario ).subscribe(
      (resp) =>{
        
        console.log(resp);
        Swal.close();

        if (this.recordarme) {
          this.utils.addLocalStorage('email',this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },
      (err) =>{
        console.log(err.error.error.message);
        this.utils.getMessage("Error de registro", "error" , "Registro");
      
      });
}

}
