import { Component, Input } from '@angular/core';
import { LandingVendorComponent } from '../landing-vendor/landing-vendor.component';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.css'],
})
export class VendorCardComponent {
  constructor(private landing: LandingVendorComponent) {}

  openBooking() {
    this.landing.popup = true;
  }

  @Input() data: any;

  public startDate: any;
  public endDate: any;
  public datePosted: any;

  serviceTypeAvatarImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/avatar-vendor-1.png',
    Gardening: 'assets/images/avatar-vendor-2.png',
    Electrician: 'assets/images/avatar-vendor-2.png',
    Plumbing: 'assets/images/avatar-vendor-3.png',
    Painting: 'assets/images/avatar-vendor-1.png',

    // Add more mappings as needed
  };

  serviceTypeImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/cleaning.svg',
    Gardening: 'assets/images/gardening.svg',
    Electrician: 'assets/images/electrician.svg',
    Plumbing: 'assets/images/plumbing.svg',
    Painting: 'assets/images/painting.svg',

    // Add more mappings as needed
  };

  // TODO Change date posted format from number to date, same for other dates
  ngOnInit() {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.datePosted = this.data.datePosted;
    this.datePosted = new Date(this.datePosted);

    const day2 = this.datePosted.getDate();
    const month2 = this.datePosted.getMonth();
    const year2 = this.datePosted.getFullYear();
    this.datePosted = `${day2} ${monthNames[month2]} ${year2}`;

    this.startDate = this.data.startDate;
    const year0 = this.startDate[0];
    const month0 = this.startDate[1];
    const day0 = this.startDate[2];
    this.startDate = `${day0} ${monthNames[month0]} ${year0}`;

    this.endDate = this.data.endDate;
    const year1 = this.endDate[0];
    const month1 = this.endDate[1];
    const day1 = this.endDate[2];
    this.endDate = `${day1} ${monthNames[month1]} ${year1}`;
  }
}
