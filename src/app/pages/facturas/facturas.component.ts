import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/api/firebase.service';
import { UtilsService } from '../../providers/utils/utils.service';
import { FacturaModel } from '../../modelos/factura.models';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { LocalstorageService } from '../../providers/localstorage/localstorage.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  
  factura : FacturaModel;
  facturas = [];

  modo : any;
  idFactura : any;

  modal : any;
  email : any;

  constructor( private firebase : FirebaseService,
                private utils : UtilsService,
                private localstorage : LocalstorageService ) { 

  this.factura = new FacturaModel("","","","","","");

  this.modal = localStorage.getItem('modal');
  this.email = localStorage.getItem('email');
}

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
          this.showModal();

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

  onSubmit( form : NgForm ){

    if ( form.invalid ) { return; }

    this.utils.getMessage("Espere por favor","info","");
    Swal.showLoading();

    //convertir array facturas a objeto Ojo
    let data = {
      producto : this.factura.producto,
      unidades : this.factura.unidades,
      kilos : this.factura.kilos,
      precio : this.factura.precio,
      descripcion : this.factura.descripcion,
      estado : this.factura.estado
    }

    // console.log(data);

    if (this.modo === 1) {

    this.firebase.addFactura( data ).then(() =>{

      this.utils.getMessage("Se añadio correctamente","success","Factura");
      Swal.close();

    },
    (err) =>{

      this.utils.getMessage(err,"info","Factura");

    });
  
  }else if (this.modo === 2) {
    
      this.firebase.updateFactura( this.idFactura , data ).then(()=>{
        
        console.log("se modifico correctamente");

      })
      .catch( (err)=>{
        console.log(err);
      });

    }

  }

  showFactura( codigo ){

    this.changeModo( 2 , codigo );

    this.firebase.getFactura( codigo ).subscribe(
        (resp) =>{

          this.factura = resp.payload.data();
          // console.log(resp.payload.data());
      },
      (err) =>{
        console.log(err);
      });

  } 

  showModal(){

    if( this.modal === 'true' ){ 
      
      this.utils.showPrimerLogin( this.email ); 
      
      setInterval( () =>{
        
      localStorage.removeItem('modal');

      }, 6000);

    }

  }

  changeModo( mod : any, code : any ){
    this.modo = mod;
    this.idFactura = code;
  }

}
