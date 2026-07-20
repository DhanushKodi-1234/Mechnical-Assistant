import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { MloginComponent } from './components/mlogin/mlogin.component';
import { MsignupComponent } from './components/msignup/msignup.component';
import { GuestGuard } from '../../services/guard/gust.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
     {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'signup',
        component: SignupComponent
    },
      {
        path: 'admin',
        component: AdminloginComponent,
 
    },
      {
        path: 'mclogin',
        component: MloginComponent
    },
      {
        path: 'mcsignup',
        component: MsignupComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }