import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { SurveysService } from 'src/app/model/surveys.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  user = new User();

  constructor(
    private router: Router,
    private service: SurveysService,
    private auth: AuthService
    ) { 
      this.user._id = auth.user?._id;
      this.user.password = auth.user?.password;
    }

  ngOnInit(): void {
  }

  savePassword(form: NgForm):void
  {
    this.service.updatePassword(this.user)
    .subscribe(data => {
      this.router.navigate(["/landing"]) 
  });
  }

}
