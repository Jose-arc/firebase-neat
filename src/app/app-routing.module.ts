import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages
import { LoginComponent } from '../app/pages/login/login.component';
import { RegistroComponent } from '../app/pages/registro/registro.component';
import { FacturasComponent } from '../app/pages/facturas/facturas.component';

//Guard
import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  { 
    path: "facturas", 
    component: FacturasComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: "login", 
    component: LoginComponent 
  },
  { 
    path: "registro", 
    component: RegistroComponent 
  },
  { 
    path: "**", 
    redirectTo: "registro" 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
