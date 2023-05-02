import { Injectable } from '@angular/core';
import { CanActivate,  ActivatedRouteSnapshot,   RouterStateSnapshot,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
  
    const  isSession:boolean = this.authService.isSession();
    const isLogin:boolean = state.url.includes('login');
    const url=state.url;

    if( isLogin && isSession){
      this.router.navigate(['/']);
      return false; 
    } else if( !isLogin && !isSession){
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
      return false;
    } else {
      return true;
    }
    
  }


}