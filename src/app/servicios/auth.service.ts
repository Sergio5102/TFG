import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators'
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

//En este servicio estaran todos los metodos para el inicio de sesion y el logout
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = '';
  pass = '';
  constructor(public auth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService) { }

  user = this.auth.authState.pipe(map(authState => {
    console.log('authState: ', authState);
    if (authState) {
      return authState;
    } else {
      return null;
    }
  }))
  //Inicio de Sesion
  login() {
    console.log('login');
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
      .then(user => {
        this.router.navigate(['/home']);
        console.log('user logado con email', user);
      })
      .catch(error => {
        console.log('error code', error.code)
        if (error.code === 'auth/wrong-password' || error.code === 'auth/internal-error') {
          this.toastr.error('Introduzca una nueva Contraseña', 'Contraseña incorrecta')
        } else if (error.code === 'auth/invalid-email') {
          this.toastr.error('El Email no es correcto', 'Email incorrecto')
        }
      })
  }
  //Inicio de sesión con Google
  glogin() {
    console.log('google login');
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {

        this.router.navigate(['/home']);
        console.log('user logado con google', user);
      })
      .catch(error => {
        console.log('error en google login: ', error);
      })
  }
  //logout
  logout() {
    this.refresh();
    this.auth.signOut();
    this.router.navigate(['/'])

  }
  //refresca la pagina al hacer el logout para que no salgan 
  //los datos del anterior inicio de sesion si fue por email
  refresh() {
    window.location.reload();


  }

  clearform(form: FormGroup) {
    form.reset();
  }
}
