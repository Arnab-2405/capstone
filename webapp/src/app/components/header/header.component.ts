import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  public username: any = localStorage.getItem('username')
  public show = true;

  ngOnInit() {
    if (localStorage.getItem('role') === 'admin')
      this.show = false;
    else
      this.show = true;
  }

  gotoProfileUpdate() {
    this.router.navigate(['update-profile'])
  }

  gotoOrderPage() {
    if (localStorage.getItem('role') === 'vendor') {
      this.router.navigate(['bookings', 'vendor'])
    }
    if (localStorage.getItem('role') === 'user') {
      this.router.navigate(['bookings', 'user'])
    }
    return '/'
  }


  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
