import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  sendContact(name:any,email:any,message:any){
    return this.http.get(`http://localhost:8080/user/send-contact/${name}/${email}/${message}`,{responseType:'text'});
  }
}
