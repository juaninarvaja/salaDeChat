import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { Mensaje } from '../pages/aula/aula.page';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  getMensajes(aula) {
    return this.firestore.collection(aula).snapshotChanges();
  }

  saveMensaje(aula, msj: Mensaje) {
    this.firestore.collection(aula).add({
      usuario: msj.usuario,
      fecha: msj.fecha,
      mensaje: msj.mensaje,
      hora: msj.hora,
      time: msj.time
    });
  }
}
