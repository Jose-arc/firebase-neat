import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionService } from '../providers/sesion/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private sesion: SesionService,
               private router: Router ){}

  canActivate(): boolean{

    if ( this.sesion.isAutentificado() ) {
    
      return true;

    }else{
      
      this.router.navigateByUrl('/login');
      return false;

    }

  }
  
}
