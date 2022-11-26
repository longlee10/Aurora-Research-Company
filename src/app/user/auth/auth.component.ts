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
    this.auth.authenticate(this.user).subscribe(data => {
      if (data.success)
      {
        this.auth.storeUserData(data.token, data.user);
        this.router.navigateByUrl('user/main');
        this.errorMessage = "";
      } else {
        this.errorMessage = data.message;
      }
    });
  }
}
