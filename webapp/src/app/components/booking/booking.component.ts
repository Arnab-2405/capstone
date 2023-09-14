import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingVendorComponent } from '../landing-vendor/landing-vendor.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  constructor(private formBuilder: FormBuilder, private landing: LandingVendorComponent, private sharingService: SharedDataService, private router: Router) { }

  public bookingDate!: FormGroup;

  public sharedData: any;
  public datesToDisable!: Date[];
  public minDate: any;
  public maxDate: any;

  ngOnInit() {
    this.bookingDate = this.formBuilder.group({
      blockedDate: ['', Validators.required]
    });
    this.sharedData = this.sharingService.getSharedDate();

    var length = this.sharedData.bookedDates.length;

    this.datesToDisable = []
    for (var i = 0; i < length; i++) {
      this.datesToDisable.push(new Date(this.sharedData.bookedDates[i].blockedDate.toDateString()));
    }

    this.minDate = new Date(this.sharedData.startDate);
    if (this.minDate < new Date()) {
      this.minDate = new Date();
    }
    this.maxDate = new Date(this.sharedData.endDate);

  }

  dateFilter = (date: Date | null): boolean => {
    const day = date?.getDay();
    return !this.datesToDisable.some(disabledDate =>
      new Date(disabledDate).toDateString() === new Date(date as Date).toDateString()
    );
  };
  gotoPayment() {
    this.router.navigate(['payment']);
  }

  close() {
    this.landing.popup = false;
  }

  setLocally() {
    localStorage.setItem('blockedDate', this.bookingDate.value);
  }
}
