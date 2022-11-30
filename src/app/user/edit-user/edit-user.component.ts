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
  private user: User = new User();

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private service: SurveysService
  ) { 
    this.editing = activeRoute.snapshot.params.mode === 'edit';

    if (this.editing){
      Object.assign(this.user, this.getUser(activeRoute.snapshot.params.id));
    }
  }

  ngOnInit(): void {
  }

  private getUser(id: String): User
  {
    return this.user.find(u => u._id===id);
  }

  private saveUser(savedUser: User):void
  {
    this.service.updateUser(savedUser).subscribe(
      u => u._id === savedUser._id);
  }

  save(form: NgForm):void
  {
    this.saveUser(this.user);
    this.router.navigateByUrl('/landing');
  }
}
