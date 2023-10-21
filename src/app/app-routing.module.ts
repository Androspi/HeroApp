import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'public', loadChildren: () => import('src/app/components/public/public.module').then(m => m.PublicModule) },
  { path: '', loadChildren: () => import('src/app/components/private/private.module').then(m => m.PrivateModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/public/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
