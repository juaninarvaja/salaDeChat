import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MensajesService } from 'src/app/services/mensajes.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

export class Mensaje {
  id: string;
  mensaje: string;
  usuario: string;
  fecha: string;
  hora: string;
  time: number;
}

@Component({
  selector: 'app-aula',
  templateUrl: './aula.page.html',
  styleUrls: ['./aula.page.scss'],
})
export class AulaPage implements OnInit {

  mensajesLista: Mensaje[];

  descripcion: string;
  usuario: string;
  aula: string;
  newMensaje: Mensaje;
  color: string;

  constructor(
    public serviceMSJ: MensajesService,
    private afAuth: AngularFireAuth,
    public activeRoute: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.aula = this.activeRoute.snapshot.paramMap.get('aulaSelected');
    this.aula === 'PPS4A' ? this.color = 'tertiary' : this.color = 'fg';
    console.log(this.aula);
    this.usuario = `${this.afAuth.auth.currentUser.email.split('@')[0]}`;
    this.getMenajes();
  }

  getMenajes() {
    this.serviceMSJ.getMensajes(this.aula).subscribe(actionArray => {
      this.mensajesLista = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Mensaje;
      });
      this.mensajesLista.sort(this.deMayorAMenor);
    });
  }

  deMayorAMenor(elem1: Mensaje, elem2: Mensaje) {
    return elem1.time - elem2.time;
  }

  enviarMensaje() {
    this.newMensaje = new Mensaje();
    const usuarioActual = `${this.afAuth.auth.currentUser.email.split('@')[0]}`;
    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const anio = new Date().getFullYear();
    const fecha = dia + '/' + mes + '/' + anio;
    const hora = new Date().getHours();
    const minutos = new Date().getMinutes();
    const time = new Date().getTime();
    this.newMensaje.usuario = usuarioActual;
    this.newMensaje.fecha = fecha;
    this.newMensaje.mensaje = this.descripcion;
    this.newMensaje.time = time;
    this.newMensaje.hora = hora + ':' + minutos;
    this.descripcion = '';
    this.serviceMSJ.saveMensaje(this.aula, this.newMensaje);
  }

  rollbackWelcome() {
    this.navCtrl.navigateBack('welcome');
  }

}
