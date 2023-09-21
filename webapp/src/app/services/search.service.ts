import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  searchByParameter(parameter:any, filter:any){
    return this.http.get(`http://localhost:8080/search/${parameter}/${filter}`);
  }
}
