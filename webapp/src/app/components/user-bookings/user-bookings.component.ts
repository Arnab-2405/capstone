import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent {

  public userData:any;

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private userDataService:UserDataService){}

  ngOnInit(){
    this.userDataService.getUserData(localStorage.getItem('email'),this.headers).subscribe({
      next:(v)=>{
        this.userData=v.myBooking;
        console.log(this.userData)
      },
      error:(e)=>{},
      complete:()=>{}
    })
  }
}
