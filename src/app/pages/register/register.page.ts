import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string;
  email:string;
  password:string;
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  createUser(){
    if (this.name != null && this.password != null && this.email != null){
      this.authService.createUserEmail(this.name,this.email,this.password)
      this.toastService.showToast('Usuario creado con éxito.', 'success')
    }else{
      this.toastService.showToast('Favor de llenar los campos.', 'danger')
    }
  }

}
