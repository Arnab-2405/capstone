import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {

  constructor(private http:HttpClient) { }

  login(data:any): Observable<any> { 
    return this.http.post('http://localhost:8062/auth/login', data, { responseType: 'text' });
  }

  signup(data:any):Observable<any>{
    return this.http.post('http://localhost:8062/auth/signup',data,{responseType:'text'});
  }

  getVendorData(headersData:any):Observable<any>{
    return this.http.get('http://localhost:9090/vendor-data/',{headers:headersData});
  }

  getSpecificVendor(vendorId:any,headersData:any){
    return this.http.get<any>(`http://localhost:9090/vendor-data/${vendorId}`,{headers:headersData});
  }
  
}
