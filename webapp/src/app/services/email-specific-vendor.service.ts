import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailSpecificVendorService {

  constructor(private http:HttpClient) { }

  getAllVendorByEmail(email: any, headersData: any) {
    return this.http.get(`http://localhost:9090/vendor-data/getAll/${email}`, { headers: headersData });
  }
}
