import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { NavbarMenuComponent } from './templates/navbar-menu/navbar-menu.component';
import { SearcherComponent } from './templates/searcher/searcher.component';
import { HeaderComponent } from './templates/header/header.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { LogoComponent } from './templates/logo/logo.component';

const modules = [
  InfiniteScrollModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
  HttpClientModule,
  DragScrollModule,
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
