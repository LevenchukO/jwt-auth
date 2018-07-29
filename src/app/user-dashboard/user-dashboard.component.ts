import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

   userData: any;
  deviceInfo = null;

  constructor(
    private _authServ: AuthService,
    private deviceService: DeviceDetectorService,
    private _router: Router
  ) {
    this._authServ.getUserData().subscribe(
      data => {
        this.userData = data;
      },
      err => this._router.navigate(['/auth/login'])
    );
  }

  ngOnInit() {
    this.epicFunction();
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/auth/login']);
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
}
