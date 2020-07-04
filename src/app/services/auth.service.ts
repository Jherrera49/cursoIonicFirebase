import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { ToastService } from './toast.service'
//CURSO FIREBASE 2
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private dataBase: AngularFirestore,
    private toastService: ToastService,
  ) { }

  loginUserEmail(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email, password).then(user =>{
      console.log(user.user.email)
      this.router.navigate(['/home'])
    }).catch(err => 
      this.toastService.showToast('Las credenciales no corresponde a nuestros registros.', 'danger')
    )
  }

  logout(){
    this.auth.signOut().then(()=>{
      this.router.navigate(['/'])
      this.toastService.showToast('Sesión finalizada.', 'success')
    }).catch(err => console.log(err.message))
  }

  isAuthenticated(){
    return this.auth.currentUser !== null;
  }

  createUserEmail(name:string,email:string, password:string){
    this.auth.createUserWithEmailAndPassword(email, password).then(user =>{
      const uid = user.user.uid
      this.dataBase.collection('users').doc(uid).set({
        uid: uid,
        name: name,
        email: email
      }).then(() => {
        console.log('Usuario creado con éxito.')
        this.router.navigate(['/home'])
      }).catch(err => console.log(err.message))
    }).catch(err => console.log(err.message))
  }
}
