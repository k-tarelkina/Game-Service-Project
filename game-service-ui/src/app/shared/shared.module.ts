import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

const PUBLIC_COMPONENTS: any[] = [];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];
const PUBLIC_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
];


@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
  imports: [
    ...PUBLIC_MODULES
  ],
  exports: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
    ...PUBLIC_MODULES
  ]
})
export class SharedModule { }
