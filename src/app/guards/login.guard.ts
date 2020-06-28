import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(){
    let userAuth = this.authService.isAuthenticated()
    if(userAuth){
      console.log('Esta autenticado')
      return true
    }else{
      console.log('No esta autenticado')
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
