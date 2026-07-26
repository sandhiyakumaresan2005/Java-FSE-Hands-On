import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;

  checkAuth(): boolean {
    return this.isLoggedIn;
  }
}
