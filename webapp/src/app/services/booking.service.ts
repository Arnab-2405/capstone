import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  bookAppointment(vendorId: any, data: any, headerData: any) {
    return this.http.put(`http://localhost:9090/vendor-data/book/job/${vendorId}`, data, { headers: headerData })
  }

  updateBlockedDate(vendorId:any,data:any,headerData:any){
    return this.http.put(`http://localhost:9090/vendor-data/book/${vendorId}`,data,{headers:headerData, responseType:'text'});
  }
}
