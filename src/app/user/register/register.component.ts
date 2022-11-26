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
    this.auth.signup(this.user)
    .subscribe(data=>{
      if(data.success){
        this.router.navigateByUrl('user/main');
      }
    })
  }
}
