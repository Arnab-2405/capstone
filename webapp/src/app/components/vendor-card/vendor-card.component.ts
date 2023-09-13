import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.css']
})
export class VendorCardComponent {
  @Input()data : any;
  
  // TODO Change date posted format from number to date, same for other dates
  
  display(){
    console.log(this.data);
  }
}
