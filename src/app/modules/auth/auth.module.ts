import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { MloginComponent } from './components/mlogin/mlogin.component';
import { MsignupComponent } from './components/msignup/msignup.component';
@NgModule({
  declarations: [SignupComponent,LoginComponent,AdminloginComponent,MloginComponent,MsignupComponent],
  imports: [
   CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
