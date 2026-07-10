// services/auth/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hasToken(): boolean {
    return !!localStorage.getItem('user_token');
  }
//   hasToken(): boolean {
//   return !!localStorage.getItem('token');
// }

getRole(): string | null {
  return localStorage.getItem('role');
}

  logout(): void {
    localStorage.removeItem('user_token');
  }
}