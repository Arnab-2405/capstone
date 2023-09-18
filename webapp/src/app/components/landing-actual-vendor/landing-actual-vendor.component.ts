import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-actual-vendor',
  templateUrl: './landing-actual-vendor.component.html',
  styleUrls: ['./landing-actual-vendor.component.css']
})
export class LandingActualVendorComponent {
  public show:boolean=false;

  change(){
    this.show=!this.show
  }
}
