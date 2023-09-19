import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private formBuilder: FormBuilder, private vendor: VendorDataService) { }

  public registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: 2,
      name: ['', Validators.required],
      email: ['', Validators.email],
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required]
    })
  }

  gotoLogin() {
    this.router.navigate(['login'])
  }

  signup() {
    if (this.registerForm.value.role === 1) {
      this.registerForm.patchValue({ role: 'vendor' });
    }
    else if (this.registerForm.value.role === 2) {
      this.registerForm.patchValue({ role: 'user' });
    }
    else {
      this.registerForm.patchValue({ role: 'admin' });
    }

    this.vendor.signup(this.registerForm.value).subscribe({
      next: (v) => { },
      error: (e) => { console.log(e) },
      complete: () => {
        this.router.navigate(['login'])
      }
    })
  }
}
