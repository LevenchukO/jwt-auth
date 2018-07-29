import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  successMessage = '';
  countries;
  cities;
  zipcodes;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });
  }

  ngOnInit() {
    this._authService.getCountries().subscribe(c => this.countries = c, err => console.log(err) );
  }

  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  // method for confirm passwords
  passValidator(control: AbstractControl) {
    if (control && (control.value !== null) || control.value !== undefined) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return { isError: true};
        }
      }
    }
    return null;
  }

  registration() {
    if (this.registerForm.valid) {
      this._authService.registration(this.registerForm.value)
        .subscribe(
          data => {
            this.successMessage = 'Registration success';
            this._router.navigate(['../login'], {relativeTo: this._activatedRoute});
            } ,
          error => this.successMessage = 'Some error'
        );
    }
  }

  movetologin() {
    this._router.navigate(['../login'], {relativeTo: this._activatedRoute});
  }

  changeCountry(newCountry: string) {
    const newitem = this.countries.find(c => c.country === newCountry);
    this.cities = null;
    this.zipcodes = null;
    this.getCitiesByCountryID(newitem._id);
  }

  changeCity(newCity: string) {
    const newitem = this.cities.find(c => c.city === newCity);
    this.zipcodes = null;
    this.getZipcodesByCity(newitem._id);
  }

  getCitiesByCountryID(id: string) {
    this._authService.getCitiesByCountry(id).subscribe(s => this.cities = s );
  }

  getZipcodesByCity(id: string) {
    this._authService.getZipByCityId(id).subscribe(z => this.zipcodes = z);
  }
}
