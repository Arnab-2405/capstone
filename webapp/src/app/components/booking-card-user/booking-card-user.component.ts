import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-booking-card-user',
  templateUrl: './booking-card-user.component.html',
  styleUrls: ['./booking-card-user.component.css']
})
export class BookingCardUserComponent {
  @Input() booking: any;


  public bookingDate: any;



  public lastUpdatedText: any;
  public startTime = new Date();

  public updateLastUpdatedText = () => {
    const currentTime = new Date();
    const elapsedMinutes = Math.floor((currentTime.getTime() - this.startTime.getTime()) / (1000 * 60));
    this.lastUpdatedText = `Last updated ${elapsedMinutes} mins ago`;
  };

  serviceTypeImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/cleaning.svg',
    'Gardening': 'assets/images/gardening.svg',
    'Electrician': 'assets/images/electrician.svg',
    'Plumbing': 'assets/images/plumbing.svg',
    'Painting': 'assets/images/painting.svg',
  };

  ngOnInit() {
    this.updateLastUpdatedText();
    setInterval(this.updateLastUpdatedText, 15000/2); // 60000 ms = 1 minute

    this.bookingDate=new Date(this.booking.bookingDate).toDateString();
  }
}
