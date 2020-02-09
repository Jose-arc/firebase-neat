import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../modelos/usuario.models';
import { SesionService } from '../../providers/sesion/sesion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilsService } from '../../providers/utils/utils.service';
import { FirebaseService } from '../../providers/api/firebase.service';


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
    private router : Router,
    private firebase : FirebaseService
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

        // console.log(resp['localId']);

        let localId = resp['localId'];
        let email = this.usuario.email;

        //Verificacion de usuario
        this.firebase.getUser( localId ).get()
        .then( query => {

          if ( query.empty ) {
            console.log( "Primera autentificacion" );
            // ---Logica de añadir a firebase para el message---

            let data = {
              localid : localId,
              email : email
            }

            this.firebase.addUser( data ).then(( resp )=>{

              localStorage.setItem('email', email);
              localStorage.setItem('modal','true');

              this.router.navigateByUrl('/facturas');

            })
            .catch( function( err ){
              console.log(err);
            });

            //End
          }

          query.forEach( (res) => {
            // console.log( res.data());
            
            Swal.close();
            localStorage.setItem('email', email);
            this.router.navigateByUrl('/facturas');

          });
        })
        .catch( function( err ) {
          console.log(err);
        });
        //End

        // Swal.close();
        // localStorage.setItem('email', email);
        // this.router.navigateByUrl('/facturas');

      },
      (err) =>{
        
        console.log(err.error.error.message);
        this.utils.getMessage("Error de autentificación","error","Login");
      
      });

  }

}
