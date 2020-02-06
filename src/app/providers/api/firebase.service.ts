import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

import { Factura } from '../../modelos/factura.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore : AngularFirestore ){}
  
  //Añadir Factura  

  addFactura( factura : Factura ){
    return this.firestore.collection( 'factura' ).add( factura );
  }

  //Obtener una Factura
  getFactura( codigo : string ){
    return this.firestore.collection( 'factura' ).doc( codigo ).snapshotChanges();
  }

  //Obtener todas las Facturas
  getFacturas(){
    return this.firestore.collection( 'factura' ).snapshotChanges();
  }

  //Actualizar Factura
  updateFactura( codigo : string , factura : Factura ){
    return this.firestore.collection( 'factura' ).doc( codigo ).set( factura );
  }


}
