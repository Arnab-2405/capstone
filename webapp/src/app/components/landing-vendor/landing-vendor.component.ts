import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-vendor',
  templateUrl: './landing-vendor.component.html',
  styleUrls: ['./landing-vendor.component.css']
})
export class LandingVendorComponent {

  public vendorList :any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:9090/vendor-data/').subscribe({
      next:(v)=>{
        this.vendorList=v;
      },
      error:(e)=>{

      },
      complete:()=>{
        
      }
    })
   }

}
