import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../providers/sesion/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sesion : SesionService,
              private router : Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.sesion.cerrarSesion();
    this.router.navigateByUrl('/login');
  }

}
