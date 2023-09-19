import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { LandingActualVendorComponent } from '../landing-actual-vendor/landing-actual-vendor.component';

@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css'],
})
export class VendorRegisterComponent {
  public vendorRegistrationForm!: FormGroup;
  public vendorname: any = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private vendorService: VendorDataService, private parent: LandingActualVendorComponent) { }

  ngOnInit() {
    this.vendorname = localStorage.getItem('username');
    this.vendorRegistrationForm = this.formBuilder.group({
      vendorName: [localStorage.getItem('username')],
      serviceType: ['', Validators.required],
      description: [''],
      price: ['', Validators.pattern('^[0-9]+$')],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('past-date')?.setAttribute('min', currentDate);
  }

  registerVendor() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.vendorService.addVendor(this.vendorRegistrationForm.value, headers)
      .subscribe({
        next: (v) => { },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.parent.change();
        },
      });
    this.vendorRegistrationForm.reset();
  }
}
