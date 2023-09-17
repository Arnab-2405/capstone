import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  firstLogin(email: any,headersData:any) {
    return this.http.get<any>(`http://localhost:8082/user-data/${email}`,{headers:headersData});
  }

  getAuthData(email: any,headersData:any) {
    return this.http.get<any>(`http://localhost:8062/auth-data/${email}`,{headers:headersData})
  }

  getUserData(email: any,headersData:any) {
    return this.http.get<any>(`http://localhost:8082/user-data/${email}`,{headers:headersData});
  }

  updateUserData(data: any, email: any,headersData:any) {
    return this.http.put<any>(`http://localhost:8082/user-data/${email}`, data,{headers:headersData});
  }

  updateAuthData(data: any, email: any,headersData:any) {
    return this.http.put<any>(`http://localhost:8062/auth-data/${email}`, data,{headers:headersData});
  }

  addUserData(data: any,headersData:any) {
    return this.http.post<any>(`http://localhost:8082/user-data/add`, data,{headers:headersData});
  }
}
