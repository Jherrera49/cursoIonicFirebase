import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { RoomService } from 'src/app/services/room.service';

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
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  createUser(){
    if (this.name != null && this.password != null && this.email != null){
      this.authService.createUserEmail(this.name,this.email,this.password)
      this.roomService.showToast('Usuario creado con éxito.', 'success')
    }else{
      this.roomService.showToast('Favor de llenar los campos.', 'danger')
    }
  }

}
