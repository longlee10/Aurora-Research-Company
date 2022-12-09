/*******************************
File Name: edit-user.component.ts
Description: Define the behaviour of the edit user component
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
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SurveysService } from 'src/app/model/surveys.service';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  user = new User();

  constructor(
    private router: Router, 
    private service: SurveysService,
    private auth: AuthService
  ) {
    this.user._id = auth.user?._id;
    this.user.email = auth.user?.email;
    this.user.contact_number = auth.user?.contact_number;
    this.user.displayName = auth.user?.displayName;
    //this.user.password = auth.user?.password;
  }

  save(form: NgForm):void
  {
    this.service.updateUser(this.user)
    .subscribe(data => {
      this.auth.storeUserData(data.user);
      this.router.navigate(["/landing"]) 
  });
  }
}
