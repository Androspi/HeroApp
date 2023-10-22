import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared.module';

import { EmailPattern, PasswordPattern } from 'src/app/utils/patterns.utils';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  selector: 'app-login',
  imports: [SharedModule],
  standalone: true,
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  isMobile: boolean = false;

  form: FormGroup<{ email: FormControl<string>; password: FormControl<string> }>;

  listeners: { parent: HTMLElement | Window, id: string, callback: () => any }[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private builder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.builder.nonNullable.group({
      email: ['', [Validators.required, EmailPattern]],
      password: ['', [Validators.required, PasswordPattern]],
    });
  }

  ngAfterViewInit(): void {
    const appHeight = () => this.isMobile = window.innerWidth < 600;

    appHeight();
    window.addEventListener('resize', appHeight);

    this.listeners.push({ parent: window, id: 'resize', callback: appHeight });
  }

  logIn() {
    if (this.form.invalid) {
      this.snackBar.open('Los datos de inicio de sesión no son correctos', 'Ok');
      return;
    }

    localStorage.setItem('app-user', JSON.stringify({ date: Date.now(), mail: this.form.getRawValue().email }));

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.listeners.forEach(({ callback, id, parent }) => parent.removeEventListener(id, callback));
  }

}
