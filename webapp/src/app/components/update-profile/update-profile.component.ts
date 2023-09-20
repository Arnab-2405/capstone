import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailVerifyService } from 'src/app/services/email-verify.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(private data: UserDataService, private formBuilder: FormBuilder, private router: Router, private location: Location, private snackbar: MatSnackBar, private email: EmailVerifyService) { }

  public authForm!: FormGroup;
  public userForm!: FormGroup;
  public OTP: any;

  public authData: any;
  public userData: any;

  public emailVerified: boolean | undefined;

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.userForm = this.formBuilder.group({
      dob: ['', Validators.required],
      gender: ['', [Validators.required]],
      phoneNumber: [''],
      address: ['']
    })
    this.getDataFromBackend();
  }

  getOtp() {
    this.email.getOtp(localStorage.getItem('email')).subscribe({
      next: (v) => {
        console.log(v)
        this.snackbar.open('OTP sent to registered mail', 'Close')
      },
      error: (e) => { this.snackbar.open('Error while sending Otp', 'Close') },
      complete: () => { }
    })
  }

  verifyOtp() {
    const secretInput = document.getElementById('secret') as HTMLInputElement;
    if (secretInput) {
      this.OTP = secretInput.value;
    }
    this.email.verifyOtp(localStorage.getItem('email'), this.OTP).subscribe({
      next: (v) => {
        this.emailVerified = true;
        this.snackbar.open('OTP Verfied', 'Close');
      },
      error: (e) => { this.snackbar.open('Invalid OTP', 'Close') },
      complete: () => { }
    })
  }

  changeValue() {
    this.location.back();
  }

  onSubmit() {
    var secondLogin = localStorage.getItem('secondLogin');

    if (secondLogin === "true") {
      this.data.updateUserData(this.userForm.value, localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            address: [v.address, [Validators.required]]
          })
        },
        error: (e) => {
          var mssg = e.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => { }
      })

      this.data.updateAuthData(this.authForm.value, localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          this.authForm = this.formBuilder.group({
            name: [v.name, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
            userName: [v.userName, [Validators.required]],
            email: [v.email, [Validators.required, Validators.email]]
          })
        },
        error: (e) => {
          var mssg = e.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => { }
      })
    }
    else {
      this.data.addUserData({ ...this.userForm.value, email: localStorage.getItem('email') }, this.headers).subscribe({
        next: (v) => {

          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            address: [v.address, [Validators.required]]
          });
        },
        error: (e) => {
          var mssg = e.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => { }
      })
    }

    if (localStorage.getItem('role') === 'vendor') {
      this.router.navigate(['landing', 'vendor'])
    } else {
      this.router.navigate(['landing', 'user'])
    }
  }

  //TODO
  changePass() {
    this.router.navigate([''])
  }

  getDataFromBackend() {
    this.data.getAuthData(localStorage.getItem('email'), this.headers).subscribe({
      next: (v) => {
        this.authData = v;
        this.authForm = this.formBuilder.group({
          name: [v.name, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
          userName: [v.userName, [Validators.required]],
          email: [v.email, [Validators.required, Validators.email]]
        })
      },
      error: (e) => {
        this.snackbar.open('Error while fetching details', 'Close');
      },
      complete: () => {
      }
    })
    this.data.getUserData(localStorage.getItem('email'), this.headers).subscribe({
      next: (v) => {
        this.userData = v;
        const birth = new Date(v.dob)
        this.emailVerified = v.emailVerified;
        this.userForm = this.formBuilder.group({
          dob: [birth, [Validators.required]],
          gender: [v.gender, [Validators.required]],
          phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          address: [v.address, [Validators.required]]
        })
      },
      error: (e) => {
        this.snackbar.open('Error while fetching details', 'Close');
      },
      complete: () => {
      }
    })

  }
}
