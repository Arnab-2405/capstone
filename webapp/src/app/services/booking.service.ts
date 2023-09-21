import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  bookAppointment(vendorId: any, data: any, headerData: any) {
    return this.http.put(`http://localhost:8080/vendor-data/book/job/${vendorId}`, data, { headers: headerData })
  }

  updateBlockedDate(vendorId:any,data:any,headerData:any){
    return this.http.put(`http://localhost:8080/vendor-data/book/${vendorId}`,data,{headers:headerData, responseType:'text'});
  }

  deleteServiceById(vendorId:any,headerData:any){
    return this.http.delete(`http://localhost:8080/vendor-data/${vendorId}`,{headers:headerData, responseType:'text'});
  }

  sendConfirmationEmail(email:any){
    return this.http.get(`http://localhost:8080/user/sendEmailNotification/${email}`,{responseType:'text'});
  }
}
