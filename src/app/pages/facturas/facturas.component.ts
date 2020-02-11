import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/api/firebase.service';
import { UtilsService } from '../../providers/utils/utils.service';
import { FacturaModel } from '../../modelos/factura.models';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var jQuery:any;

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
                private utils : UtilsService
              ) { 

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

        Swal.close();
        console.log(err);
        
        // this.utils.getMessage(err,"error","Facturas");

      });

      Swal.close();
      this.showModal();
  }

  deleteFactura( codigo : any , url : any){
    this.firebase.deleteFactura( codigo ).then(() =>{

      this.utils.getMessage("Producto Eliminado","success","Factura");

      //Eliminar PDF
      this.utils.updatePdf( url );
      //End

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

    //Generar PDF de respaldo
    this.utils.generarPDF( data );
    //end

    if (this.modo === 1) {

    this.firebase.addFactura( data ).then(() =>{

      this.limpiarForm();

      this.utils.getMessage("Se añadio correctamente","success","Factura");

      Swal.close();

      //Elimina el archivo pdf
      //this.utils.updatePdf( data['url'] );

      //Genera nuevamente el Archivo pdf con nuevos campos
      this.utils.generarPDF( data );

    },
    (err) =>{

      this.utils.getMessage(err,"info","Factura");

    });
  
  }else if (this.modo === 2) {
    
      this.firebase.updateFactura( this.idFactura , data ).then(()=>{

        this.limpiarForm();
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

  limpiarForm(){
    
    jQuery("#myModal").modal("hide");
    this.factura = new FacturaModel();

  }


}
