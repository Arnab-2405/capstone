import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  public registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: 2,
      name:['',Validators.required],
      email:['',Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  gotoLogin(){
    this.router.navigate(['login'])
  }

  signup(){
    if (this.registerForm.value.role === 1) {
      this.registerForm.patchValue({ role: 'vendor' });
    }
    else if (this.registerForm.value.role === 2) {
      this.registerForm.patchValue({ role: 'user' });
    }
    else {
      this.registerForm.patchValue({ role: 'admin' });
    }
    console.log(this.registerForm.value)

    //TODO CHANGE API & ROUTING
    this.http.post('http://localhost:port/path',this.registerForm.value,{responseType:'text'}).subscribe({
      next:(v)=>{},
      error:(e)=>{},
      complete:()=>{
        if(this.registerForm.value.role==='vendor'){
          this.router.navigate(['']) //TODO
        }
        else if(this.registerForm.value.role==='user'){
          this.router.navigate(['']) //TODO
        }
        else{
          this.router.navigate(['']) //TODO
        }
      }
    })
  }
}
