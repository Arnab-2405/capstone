import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent {

  public vendorList:any;
  public vendorBase:any;

  constructor(private http:HttpClient){
  }
  
  ngOnInit(){
    this.http.get('http://localhost:9090/vendor-data/').subscribe({
      next: (v) => {
        this.vendorList = v;
        this.vendorBase=this.vendorList.length
      },
      error: (e) => {},
      complete: () => {},
    });
  }
  
}
