import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/api/firebase.service';
import { UtilsService } from '../../providers/utils/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas = [];

  constructor( private firebase : FirebaseService,
                private utils : UtilsService ) { }

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas(){

    this.utils.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this.firebase.getFacturas().subscribe(
      (resp) =>{
        
        this.facturas = [];

        resp.forEach(( FacturaData : any ) =>{
          this.facturas.push({
            codigo : FacturaData.payload.doc.id,
            data : FacturaData.payload.doc.data()
          });

          Swal.close();

        });
      },
      (err) =>{
        this.utils.getMessage(err,"error","Facturas");
      }
    )
  }

  deleteFactura(codigo){
    this.firebase.deleteFactura( codigo ).then( () =>{
      
      this.utils.getMessage("Producto Eliminado","success","Factura");

    },
    (err) =>{
      
      this.utils.getMessage(err,"info","Facturas");

    }

    );
  }

}
