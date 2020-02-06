import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../modelos/usuario.models';
import { SesionService } from '../../providers/sesion/sesion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilsService } from '../../providers/utils/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel = new UsuarioModel();

  constructor(
    private utils : UtilsService,
    private sesion : SesionService,
    private router : Router
    ) { }

  ngOnInit() {
    // if (localStorage.getItem('email')) {
    //   this.usuario.email = localStorage.getItem('email');
    //   this.recordarme = true;
    // }
  }

  login( form : NgForm ){

    if ( form.invalid ) { return; }

    this.utils.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this.sesion.login( this.usuario ).subscribe(
      resp =>{
        console.log(resp);

        Swal.close();
        localStorage.setItem('email', this.usuario.email);
        this.router.navigateByUrl('/home');

      },
      (err) =>{
        
        console.log(err.error.error.message);
        this.utils.getMessage("Error de autentificación","error","Login");
      
      });

  }

}
