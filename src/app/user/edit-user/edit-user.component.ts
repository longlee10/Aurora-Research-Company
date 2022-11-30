import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SurveysService } from 'src/app/model/surveys.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editing = false;
  user = new User();

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private service: SurveysService
  ) {}

  ngOnInit(): void {
  }

  save(form: NgForm):void
  {
    this.service.updateUser(this.user)
    .subscribe(success => this.router.navigate(["/landing"]));
  }
}
