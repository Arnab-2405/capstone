import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(private data: UserDataService, private formBuilder: FormBuilder, private router: Router) { }

  public authForm!: FormGroup;
  public userForm!: FormGroup;

  public authData: any;
  public userData: any;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      name: [''],
      userName: ['', [Validators.required]],
      email: ['']
    })
    this.userForm = this.formBuilder.group({
      dob: [''],
      gender: ['', [Validators.required]],
      phoneNumber: [''],
      address: ['']
    })

    this.getDataFromBackend();
  }

  onSubmit() {
    var secondLogin = localStorage.getItem('secondLogin');

    if (secondLogin === "true") {
      this.data.updateUserData(this.userForm.value, localStorage.getItem('email')).subscribe({
        next: (v) => {
          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            address: [v.address, [Validators.required]]
          })
        },
        error: (e) => { },
        complete: () => { }
      })

      this.data.updateAuthData(this.authForm.value, localStorage.getItem('email')).subscribe({
        next: (v) => {
          this.authForm = this.formBuilder.group({
            name: [v.name, [Validators.required]],
            userName: [v.userName, [Validators.required]],
            email: [v.email, [Validators.required, Validators.email]]
          })
        },
        error: (e) => { },
        complete: () => { }
      })
    }
    else {
      this.data.addUserData({ ...this.userForm.value, email: localStorage.getItem('email') }).subscribe({
        next: (v) => {

          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            address: [v.address, [Validators.required]]
          });
        },
        error: (e) => { },
        complete: () => { }
      })
    }
  }

  //TODO
  changePass() {
    this.router.navigate([''])
  }

  getDataFromBackend() {
    this.data.getAuthData(localStorage.getItem('email')).subscribe({
      next: (v) => {
        this.authData = v;
        this.authForm = this.formBuilder.group({
          name: [v.name, [Validators.required]],
          userName: [v.userName, [Validators.required]],
          email: [v.email, [Validators.required, Validators.email]]
        })
      },
      error: (e) => {
      },
      complete: () => {
      }
    })
    this.data.getUserData(localStorage.getItem('email')).subscribe({
      next: (v) => {
        this.userData = v;
        const birth = new Date(v.dob)
        this.userForm = this.formBuilder.group({
          dob: [birth, [Validators.required]],
          gender: [v.gender, [Validators.required]],
          phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          address: [v.address, [Validators.required]]
        })
      },
      error: (e) => {
      },
      complete: () => {
      }
    })

  }
}
