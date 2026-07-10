// services/guard/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean | UrlTree {
    const role = this.auth.getRole();

    if (role === 'admin') {
      return true;
    }
    window.alert('Access Denied. Admin privileges required.');
    if (role === 'mechanic') return this.router.parseUrl('/app/mech');
    if (role === 'customer') return this.router.parseUrl('/app/customer');

    return this.router.parseUrl('/auth/login');
  }
}