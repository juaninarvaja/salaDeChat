import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  myForm: FormGroup;
  spinnerLoad: boolean;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.clearControls();
  }s

  clearControls() {
    this.myForm.get('user').setValue('');
    this.myForm.get('password').setValue('');
  }

  loadSelectedUser(value: string) {
    if (value === 'a') {
      this.myForm.get('user').setValue('admin@admin.com');
      this.myForm.get('password').setValue('111111');
    } else if (value === 'i') {
      this.myForm.get('user').setValue('invitado@invitado.com');
      this.myForm.get('password').setValue('222222');
    } else if (value === 'u') {
      this.myForm.get('user').setValue('usuario@usuario.com');
      this.myForm.get('password').setValue('333333');
    }  else if (value === 'an') {
      this.myForm.get('user').setValue('anonimo@anonimo.com');
      this.myForm.get('password').setValue('444444');
    } else if (value === 't') {
      this.myForm.get('user').setValue('tester@tester.com');
      this.myForm.get('password').setValue('555555');
    }
  }

  async login() {
    this.spinnerLoad = true;
    try {
      const response = await this.afAuth.auth.signInWithEmailAndPassword(this.myForm.get('user').value, this.myForm.get('password').value);
      if (response) {
        this.spinnerLoad = false;
        this.navCtrl.navigateRoot('welcome');
      }
    } catch (error) {
      this.spinnerLoad = false;
      this.clearControls();
      this.navCtrl.navigateForward(['error/', error.message]);
    }
  }

}
