import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { LogoComponent } from './templates/logo/logo.component';

const modules = [
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule,
  RouterModule,
  CommonModule,
  PipesModule,
  FormsModule,
];

const templates: any[] = [
  LogoComponent
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
