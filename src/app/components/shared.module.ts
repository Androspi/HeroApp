import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { SearcherComponent } from './templates/searcher/searcher.component';
import { HeaderComponent } from './templates/header/header.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { LogoComponent } from './templates/logo/logo.component';
import { NavbarMenuComponent } from './templates/navbar-menu/navbar-menu.component';

const modules = [
  ReactiveFormsModule,
  NgxSpinnerModule,
  HttpClientModule,
  MaterialModule,
  RouterModule,
  CommonModule,
  PipesModule,
  FormsModule,
];

const templates: any[] = [
  NavbarMenuComponent,
  SearcherComponent,
  HeaderComponent,
  NavbarComponent,
  LogoComponent,
];

const directives: any[] = [
  DirectivesModule,
  NgOptimizedImage,
]

@NgModule({
  exports: [modules, templates, directives],
  imports: [modules, directives],
  declarations: [templates],
})
export class SharedModule { }
