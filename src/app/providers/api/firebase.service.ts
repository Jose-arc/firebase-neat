import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// import { Observable } from 'rxjs';

import { FacturaModel } from '../../modelos/factura.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore : AngularFirestore,
               private storage : AngularFireStorage  ){}
  
  //Añadir Factura  

  addFactura( factura : FacturaModel ){
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
  updateFactura( codigo : string , factura : FacturaModel ){
    return this.firestore.collection( 'factura' ).doc( codigo ).set( factura );
  }

  //Eliminar Factura

  deleteFactura( codigo: string ){
    return this.firestore.collection( 'factura' ).doc( codigo ).delete();
  }

  //Verificacion de usuario
  addUser( usuario: { localid: string, email: string } ){
    return this.firestore.collection( 'user' ).add( usuario );
  }

  getUser( localid: string ){
    return this.firestore.collection( 'user' ).ref.where( 'localid', '==', localid );
  }

}
