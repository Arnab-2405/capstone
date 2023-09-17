import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  firstLogin(email: any) {
    return this.http.get<any>(`http://localhost:8082/user-data/${email}`);
  }

  getAuthData(email: any) {
    return this.http.get<any>(`http://localhost:8062/auth-data/${email}`)
  }

  getUserData(email: any) {
    return this.http.get<any>(`http://localhost:8082/user-data/${email}`);
  }

  updateUserData(data: any, email: any) {
    return this.http.put<any>(`http://localhost:8082/user-data/${email}`, data);
  }

  updateAuthData(data: any, email: any) {
    return this.http.put<any>(`http://localhost:8062/auth-data/${email}`, data);
  }

  addUserData(data: any) {
    return this.http.post<any>(`http://localhost:8082/user-data/add`, data);
  }
}
