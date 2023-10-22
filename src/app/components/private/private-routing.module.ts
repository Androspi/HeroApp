import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';

import { AuthGuard } from 'src/app/guards/auth.guard';

import { PrivateComponent } from './private.component';

const routes: Routes = [{
  component: PrivateComponent,
  canActivate: [() => inject(AuthGuard).canActivate()],
  path: '',
  children: [
    { path: 'character/:id', loadComponent: () => import('./character/character.component').then(c => c.CharacterComponent), },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent), },
    { path: '**', pathMatch: 'full', redirectTo: '/public/login' }
  ],
}, { path: '**', pathMatch: 'full', redirectTo: '/public/login' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
