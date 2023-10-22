import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';

import { LoginGuard } from 'src/app/guards/login.guard';

import { PublicComponent } from './public.component';

const routes: Routes = [{
  component: PublicComponent,
  path: '',
  children: [{
    loadComponent: () => import('./login/login.component').then(e => e.LoginComponent),
    canActivate: [() => inject(LoginGuard).canActivate()],
    path: 'login',
  }, { path: '**', pathMatch: 'full', redirectTo: '/public/login' }]
}, { path: '**', pathMatch: 'full', redirectTo: '/public/login' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
