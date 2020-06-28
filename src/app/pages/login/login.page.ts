import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:string;
  private password:string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  loginEmail(){
    if (this.email != null && this.password != null){
      this.authService.loginUserEmail(this.email, this.password)
    }else{
      this.roomService.showToast('Favor de completar los campos.','danger')
    }
  }

  register(){
    this.router.navigate(['/register'])
  }

}
