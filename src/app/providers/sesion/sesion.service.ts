import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../modelos/usuario.models';
import { map } from 'rxjs/operators';

import { Conexion, UrlConexion } from '../conexion/conexion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private url : string;
  
  private apikey : string;

   // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]


  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  userToken: any;

  constructor(private http : HttpClient) {
    
    this.apikey = Conexion.apiKey;
    this.url = UrlConexion.url;
    
    this.leerToken();

  }

  login( usuario : UsuarioModel ){

    let data = {

      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true

    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      data
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ){

    let data = {

      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true

    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      data
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  guardarToken( idToken : string ){
    
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

  }

  leerToken(){

    if ( localStorage.getItem('token') ) {
      
      this.userToken = localStorage.getItem('token');

    }else{
    
      this.userToken = '';

    }

    return this.userToken;

  }

  cerrarSesion(){

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('factura');
    localStorage.removeItem('showmodal');
    
  }

  isAutentificado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }else {
      return true;
    }

  }

  

}
