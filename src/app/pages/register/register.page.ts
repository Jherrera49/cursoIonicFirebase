import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  createUser(){
    this.authService.createUserEmail(this.name,this.email,this.password)
  }

}
