import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared.module';

import { PrivateComponent } from './private.component';

@NgModule({
  imports: [
    PrivateRoutingModule,
    SharedModule,
  ],
  declarations: [
    PrivateComponent,
  ],
})
export class PrivateModule { }
