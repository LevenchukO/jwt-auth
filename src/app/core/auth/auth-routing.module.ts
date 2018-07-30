import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {PassResetComponent} from './pass-reset/pass-reset.component';
import {ReqPassResetComponent} from './req-pass-reset/req-pass-reset.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children:
      [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegistrationComponent },
        { path: 'pass-reset/:token', component: PassResetComponent },
        { path: 'req-pass-reset', component: ReqPassResetComponent },
      ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AuthRoutingModule { }
