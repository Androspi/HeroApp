import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../services/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private snackBar: MatSnackBar,
    private User: UserService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    if (this.User.isLoggedIn) {
      return true;
    }

    const { date, mail } = JSON.parse(localStorage.getItem('app-user') ?? '{}');
    if (!date || !mail) {
      this.router.navigate(['/public/login']);
      return false;
    }

    const diff = Math.abs(Date.now() - date);
    if (diff > 72e5) {
      this.snackBar.open('Su tiempo en sesión ha finalizado');
      localStorage.removeItem('app-user');
      this.router.navigate(['/public/login']);
      return false;
    }

    this.User.isLoggedIn = true;
    this.User.mail = mail;

    return true;
  }

}
