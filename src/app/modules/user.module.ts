import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../screens/user/register/register.component';
import {LoginComponent} from '../screens/user/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared.module';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: []},
  {path: 'login', component: LoginComponent, canActivate: []},
  {path: 'register', component: RegisterComponent, canActivate: []},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
