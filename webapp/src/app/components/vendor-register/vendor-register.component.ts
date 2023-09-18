import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css'],
})
export class VendorRegisterComponent {
  public vendorRegistrationForm!: FormGroup;
  public vendorname: any = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private vendorService: VendorDataService) { }

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
    console.log(this.vendorRegistrationForm.value)
    this.vendorService.addVendor(this.vendorRegistrationForm.value, headers)
      .subscribe({
        next: (v) => { console.log(v)},
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.router.navigate(['landing', 'vendor'])
        },
      });
    this.vendorRegistrationForm.reset();
  }
}
