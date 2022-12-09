/*******************************
File Name: register.component.ts
Description: Define the behaviour of the register user component
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public user = new User();
  public errorMessage?: String;

  constructor(
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  signup():void
  {
    this.auth.signup(this.user).subscribe({
      next: data => {
        this.router.navigateByUrl('user/main');
      },
      error: e => {
        this.errorMessage = e.error.message == undefined ? "Unknown error" : e.error.message;
      }
    });
  }
}
