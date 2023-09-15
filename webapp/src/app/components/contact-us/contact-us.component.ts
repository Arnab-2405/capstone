// contact-us.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    comments: ''
  };

  isFormSubmitted = false;

  submitForm() {
    // You can add your backend communication logic here.
    // For now, just set the form submitted flag to true.
    this.isFormSubmitted = true;
  }
}
