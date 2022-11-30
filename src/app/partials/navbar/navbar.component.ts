import { Component, OnInit } from '@angular/core';
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
    this.authService.logout().subscribe(success => this.router.navigate(["/"]));
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
