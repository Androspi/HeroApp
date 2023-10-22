import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;

  mail = signal('');

  name = computed(() => this.mail().split('@')[0]);

  initial = computed(() => this.mail()[0] ?? '');

  constructor(
    private router: Router
  ) { }

  /** Destruye la sesión del usuario */
  logOut() {
    localStorage.removeItem('app-user');
    this.isLoggedIn = false;
    this.mail.set('');

    this.router.navigate(['/public/login']);
  }

}
