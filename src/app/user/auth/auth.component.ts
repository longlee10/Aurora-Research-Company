import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../model/auth.service';

import { User } from '../../model/user.model';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit
{
  public user = new User();
  public errorMessage?: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  authenticate(): void
  {
    // perform authentication
    this.auth.authenticate(this.user).subscribe({
      next: data => {
        this.auth.storeTokenData(data.token);
        this.auth.storeUserData(data.user);
        this.router.navigateByUrl('user/main');
        this.errorMessage = "";
      },
      error: e => {
        this.errorMessage = e.error.message == undefined ? "Unknown error" : e.error.message;
      }
    });
  }
}
