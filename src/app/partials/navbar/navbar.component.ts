import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: User;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout().subscribe(success => this.router.navigate(["/"]));
  }

  isLoggedIn(): boolean
  {
    return this.authService.authenticated;
  }
}
