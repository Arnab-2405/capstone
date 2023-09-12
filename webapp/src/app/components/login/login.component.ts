import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  public loginForm!: FormGroup;
  public role: any;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      role: ['2'],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.value.role === '1') {
      this.loginForm.patchValue({ role: 'vendor' });
    }
    else if (this.loginForm.value.role === '2') {
      this.loginForm.patchValue({ role: 'user' });
    }
    else {
      this.loginForm.patchValue({ role: 'admin' });
    }
    localStorage.setItem('role', this.loginForm.value.role);
    this.role = localStorage.getItem('role');
    if (this.role === 'vendor') {
      this.http.post('http://localhost:9090/vendor-auth', this.loginForm.value, { responseType: 'text' }).subscribe({
        next: (v) => {
          const temp = v.split(" ");
          const token = temp[0];
          const username = temp[1];
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
        },
        error: (e) => { },
        complete: () => { }
      })
    }
  }
}
