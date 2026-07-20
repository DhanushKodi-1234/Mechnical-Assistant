// services/guard/guest.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const hasToken = this.auth.hasToken();
    const role = this.auth.getRole();

    // If not logged in, let them access login/signup pages
    if (!hasToken) {
      return true;
    }

    // If logged in, redirect them away from login pages to their respective dashboards
    switch (role) {
      case 'admin':
        return this.router.parseUrl('/app/admin');
      case 'mechanic':
        return this.router.parseUrl('/app/mech');
      case 'customer':
      default:
        return this.router.parseUrl('/app/customer');
    }
  }
}