import { NgModule } from '@angular/core';

import { LastNumberPipe } from './last-number.pipe';

const pipes: any[] = [
    LastNumberPipe
]

@NgModule({
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }
