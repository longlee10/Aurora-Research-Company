import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyExpression } from 'mongoose';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res:AnyExpression) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
