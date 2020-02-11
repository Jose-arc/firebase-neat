import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from "firebase";

// jsPDF libreria
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private firebase : AngularFireStorage) { }

  getMessage(mensaje: any, icono: any, tituloAlerta: string){
    return Swal.fire({
      allowOutsideClick: false,
      icon: icono,
      title: tituloAlerta,
      text: mensaje
    });
  }

  showPrimerLogin( email : string ){
    Swal.fire({
      title: `<strong>Bienvenido ${ email } </strong>`,
      icon: 'info',
      html:
        '<p>Este modal solamente se mostrara en su primer ingreso</p>' +
        '<p>Muchas gracias.</p>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Entendido',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
    // then ( function () {
    //   console.log("se mostro el modal"); 
    // });
  }

  generarPDF( data : any){

    console.log('Subiendo...');

    var columns = ['Productos','Unidades','Kilos','Precio','Descripcion','Estado'];
    var rows = [];

    for(var key in data){
         var temp = [data[key]];
         rows.push(temp);
         //console.log(temp,"temp");
       }

    var doc = new jsPDF('p', 'pt');

    //Header 
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text("Factura Neat - Test", 50, 22);
    //End


    doc.autoTable(columns, rows);
    doc.setFontStyle('Bold');
    doc.setFontSize(14);


    const nomPdf = Math.random().toString(30).substring(2);
    const ruta = `pdf_factura/${ nomPdf }`;

    //Añadir ruta del archivo al ojeto factura
    data.url = nomPdf;

    
    //firebase soporta archivos blob o file 
    var archivo = new Blob([ doc.output('blob') ], { type : 'application/pdf'});

    //crear storage ref
    var storageRef = this.firebase.storage.ref( ruta );
    
    //subir pdf
    var upload = storageRef.put( archivo );

    //manejo de errores
    upload.on( firebase.storage.TaskEvent.STATE_CHANGED,
      function(resp){

        var progreso = (resp.bytesTransferred / resp.totalBytes) * 100;
        console.log( 'Subida en ' + progreso + '%');

        switch(resp.state){

          case firebase.storage.TaskState.PAUSED:
            console.log('Su archivo se pauso, revise conexion a internet');
            break;

          case firebase.storage.TaskState.RUNNING:
            console.log('Su archivo sigue subiendo');
            break;
        }

      },
      function(err){
        console.log(err);
      },
      
      function(){
        upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //console.log(downloadURL);
        });
      });

  }

  downloadPdf( nombre : any ){
    
    var storageRef = this.firebase.storage.ref();
    
    storageRef.child( 'pdf_factura/'+ nombre ).getDownloadURL().then( function( url ){

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
      var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      window.open( url , '_blank');

    }).catch(function(err){

      console.log("No se pudo conseguir la ruta " + err);

    });

  }

  updatePdf( nombre: any ){

    var storageRef = this.firebase.storage.ref();
    storageRef.child( 'pdf_factura/' + nombre );

    //Eliminar Pdf de respaldo
    
    storageRef.delete().then(function() {
      console.log('Se modifico correctamente el pdf!!');
    }).catch(function(error) {
      console.log(error);
    });

  }

  
}
