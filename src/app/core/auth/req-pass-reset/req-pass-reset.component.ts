import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-inquire-pass-reset',
  templateUrl: './req-pass-reset.component.html',
  styleUrls: ['./req-pass-reset.component.scss']
})
export class ReqPassResetComponent implements OnInit {

  recoveryForm: FormGroup;
  sendMessage;

  constructor(
    private _authServ: AuthService,

  ) {
    this.recoveryForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.recoveryForm.get(controlName).invalid && this.recoveryForm.get(controlName).touched;
  }

  recovery() {
    if (this.recoveryForm.valid) {
      this._authServ.reqPassReset(this.recoveryForm.valid).subscribe(data => {
        console.log(data);
        this.sendMessage = data;
        // setTimeout(() => this.sendMessage = null, 6000);
      },
        err => console.log(err));
    }

  }

}
