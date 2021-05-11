import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  get user() {
    return this.AuthService.user;
  }

  dateDay = new Date().toLocaleDateString();

  constructor( private router: Router,
               private AuthService: AuthService ) { }

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.AuthService.logout();
  }

}
