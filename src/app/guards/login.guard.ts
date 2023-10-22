import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../services/app/user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard {

  constructor(
    private snackBar: MatSnackBar,
    private User: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.User.isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    const { date, mail }: { date: number; mail: string; } = JSON.parse(localStorage.getItem('app-user') ?? '{}');
    if (!date || !mail) {
      return true;
    }

    const diff = Math.abs(Date.now() - date);
    if (diff > 72e5) {
      this.snackBar.open('Su tiempo en sesión ha finalizado', 'Ok');
      localStorage.removeItem('app-user');
      return true;
    }

    this.User.isLoggedIn = true;
    this.User.mail.set(mail);

    this.router.navigate(['/home']);
    return false;
  }

}
