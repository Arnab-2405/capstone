import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private formBuilder: FormBuilder, private vendorData: VendorDataService, private userData: UserDataService) { }

  public loginForm!: FormGroup;
  public role: any;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      role: 2,
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    })
  }

  gotoForgotPass() {
    this.router.navigate(['']) //TODO Navigate to reset password
  }

  gotoSignup() {
    this.router.navigate(['signup'])
  }

  login() {
    if (this.loginForm.value.role === 1) {
      this.loginForm.patchValue({ role: 'vendor' });
    }
    else if (this.loginForm.value.role === 2) {
      this.loginForm.patchValue({ role: 'user' });
    }
    else if (this.loginForm.value.role === 3) {
      this.loginForm.patchValue({ role: 'admin' });
    }
    localStorage.setItem('role', this.loginForm.value.role);
    this.role = localStorage.getItem('role');

    this.vendorData.login(this.loginForm.value).subscribe({
      next: (v) => {
        const temp = v.split(" ");
        const token = temp[0];
        const username = temp[1];
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('email', this.loginForm.value.email)

        if (this.loginForm.value.role === 'vendor') {
          this.router.navigate(['landing', 'vendor']);
        } else if (this.loginForm.value.role === 'user') {
          this.userData.firstLogin(this.loginForm.value.email).subscribe({
            next: (v) => {
              localStorage.setItem('secondLogin', v.firstLoginDone)
              if (v.firstLoginDone) {
                this.router.navigate(['landing', 'user']);
              }
              else {
                this.router.navigate(['update-profile'])
              }
            },
            error: (e) => {
            },
            complete: () => {

            }
          })
          this.router.navigate(['landing', 'user']);
        } else if (this.loginForm.value.role === 'admin') {
          this.router.navigate(['admin', 'dashboard'])
        } else {
          this.router.navigate([''])
        }
      },
      error: (e) => {

      },
      complete: () => {
        this.loginForm.reset();
      }
    });
  }
}
