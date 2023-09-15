import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { VendorDataService } from 'src/app/services/vendor-data.service';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent {

  public vendorList: any;
  public vendorBase: any;
  public labels: any[] = [];
  public data: any = [];

  public labelForCity:any[]=[];
  public labelForPrice:any[]=[];

  public hashMap: { [key: string]: number } = {};
  public hashMap2: { [key: string]: number } = {}

  constructor(private http: HttpClient,private dataService:VendorDataService) {
  }

  ngOnInit() {
    const token=localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.dataService.getVendorData(headers).subscribe({
      next: (v) => {
        this.vendorList = v;
        this.vendorBase = this.vendorList.length;
        this.populateMap();
        this.vendor_location_base();
        this.checkPricesInEachCity();
        this.city_price_chart();
      },
      error: (e) => { },
      complete: () => {
        this.pushDataToArrays();
        this.pushToArrays2();
      },
    });
  }

  pushDataToArrays() {
    for (const key in this.hashMap) {
      if (this.hashMap.hasOwnProperty(key)) {
        const value = this.hashMap[key];
        this.labels.push(key);
        this.data.push(value);
      }
    }
  }

  populateMap() {
    this.vendorList.forEach((element: any) => {
      var key = element.location;
      if (this.hashMap.hasOwnProperty(key)) {
        this.hashMap[key] += 1;
      } else {
        this.hashMap[key] = 1;
      }
    });
  }

  pushToArrays2(){
    for (const key in this.hashMap2) {
      if (this.hashMap2.hasOwnProperty(key)) {
        const value = this.hashMap2[key];
        this.labelForCity.push(key);
        this.labelForPrice.push(value);
      }
    }
  }

  checkPricesInEachCity(){
    this.vendorList.forEach((element:any)=>{
      var key=element.location;
      if(this.hashMap2.hasOwnProperty(key)){
        const value=this.hashMap2[key];
        this.hashMap2[key]=(value+element.price)/2;
      }
      else{
        this.hashMap2[key]=element.price;
      }
    })
    console.log(this.hashMap2)
  }

  city_price_chart(){
    new Chart(document.getElementById('avg-city-price') as any,{
      type:'bar',
      data:{
        labels:this.labelForCity,
        datasets:[{
          label:'Average price of Service per City',
          data:this.labelForPrice,
          borderWidth:1
        }]
      }
    })
  }

  vendor_location_base() {
    new Chart(document.getElementById('vendor-location-size') as any, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Vendors in Each City',
          data: this.data,
          borderWidth: 1
        }]
      }
    });
  }
}
