import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-landing-vendor',
  templateUrl: './landing-vendor.component.html',
  styleUrls: ['./landing-vendor.component.css'],
})
export class LandingVendorComponent {
  public vendorList: any;

  public popup: boolean = false;

  constructor(private data: VendorDataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'user') {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
      this.data.getVendorData(headers).subscribe({
        next: (v) => {
          this.vendorList = v;
        },
        error: (e) => {
          var mssg = e.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => { },
      });
    } else {
      this.snackbar.open('User privilges are required','Close');
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollButton = document.getElementById('scroll');
    if (scrollButton) {
      // Show the button when the user has scrolled down a certain amount
      scrollButton.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
    }
  }
}
