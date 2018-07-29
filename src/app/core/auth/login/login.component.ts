import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _authServ: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    if (this.loginForm.valid) {
      this._authServ.login(this.loginForm.value)
        .subscribe(data => {
            localStorage.setItem('token', data.toString());
            this._router.navigate(['/user-info']);
          },
          error => {
          }
        );
    }
  }

  movetoregister() {
    this._router.navigate(['../register'], {relativeTo: this._activatedRoute});
  }
}
