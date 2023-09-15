import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-landing-vendor',
  templateUrl: './landing-vendor.component.html',
  styleUrls: ['./landing-vendor.component.css'],
})
export class LandingVendorComponent {
  public vendorList: any;

  public popup:boolean=false;

  constructor(private data:VendorDataService) {}

  ngOnInit() {
    const token=localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.data.getVendorData(headers).subscribe({
      next: (v) => {
        this.vendorList = v;
      },
      error: (e) => {},
      complete: () => {},
    });
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
