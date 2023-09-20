import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifyService {

  constructor(private http:HttpClient) { }

  public getOtp(email:any){
    return this.http.get(`http://localhost:8066/user/send-otp/${email}`,{responseType:'text'});
  }
  public verifyOtp(email:any,otp:any){
    return this.http.get(`http://localhost:8066/user/verify-otp/${email}/${otp}`,{responseType:'text'});
  }
}
