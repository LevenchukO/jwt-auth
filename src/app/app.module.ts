import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AppComponent } from './app.component';
import {AuthModule} from './core/auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './core/services/auth.service';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    MatButtonModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
