import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [
    LoginComponent,
    AuthHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
