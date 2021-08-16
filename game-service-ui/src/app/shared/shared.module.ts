import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

const PUBLIC_COMPONENTS: any[] = [];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];
const PUBLIC_MODULES: any[] = [
  MatButtonModule,
];


@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
  imports: [
    CommonModule,
    ...PUBLIC_MODULES
  ],
  exports: [

  ]
})
export class SharedModule { }
