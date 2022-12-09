/*******************************
File Name: navbar.component.ts
Description: Define the behaviour of navigation bar component
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  get user(): User | undefined
  {
    return this.authService.user;
  }

  get isLoggedIn(): boolean
  {
    return this.authService.authenticated;
  }

  get isAdmin(): boolean
  {
    return this.authService.isAdmin;
  }
}
