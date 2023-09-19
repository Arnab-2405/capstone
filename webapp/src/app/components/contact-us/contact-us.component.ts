// contact-us.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(private formBuilder:FormBuilder){}

  public contactForm!:FormGroup;

  ngOnInit(){
    this.contactForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.email],
      message:['',Validators.required],
    })
  }
}
