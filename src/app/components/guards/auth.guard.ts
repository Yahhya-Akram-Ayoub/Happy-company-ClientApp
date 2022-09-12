import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!this.authenticationService.getToken()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
class NotAuthGuard implements CanActivate {
  constructor(
    private authenticationService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authenticationService.getToken()) {
      return true;
    }
    this.router.navigate(['dashboard']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
class AdminGuard implements CanActivate {
  constructor(
    private authenticationService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !!this.authenticationService.getToken() &&
      this.authenticationService.getUser().role == 'Admin'
    ) {
      return true;
    }
    this.router.navigate(['dashboard']);
    return false;
  }
}
export { AuthGuard, NotAuthGuard, AdminGuard };
