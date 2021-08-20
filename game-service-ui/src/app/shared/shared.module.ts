import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from '@angular/material/checkbox';

const PUBLIC_COMPONENTS: any[] = [];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];
const PUBLIC_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
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
