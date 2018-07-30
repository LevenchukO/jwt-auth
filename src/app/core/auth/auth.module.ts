import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {MatButtonModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReqPassResetComponent } from './req-pass-reset/req-pass-reset.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    ReqPassResetComponent,
    PassResetComponent
  ],
  imports: [
    AuthRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class AuthModule { }
