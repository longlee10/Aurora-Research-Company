import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/model/admin.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  _id?: number;

  constructor(public formBuilder: FormBuilder,
    public adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editForm = this.formBuilder.group({
      username: [''],
      email: [''],
      contact_number: [''],
      displayName: [''],
    });

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.adminService.getUser(id).subscribe(
        (user) => {
          if (!user.status) {
            this.editForm.setValue({
              username: user['username'],
              email: user['email'],
              contact_number: user['contact_number'],
              displayName: user['displayName'],
            });
            this._id = user['_id'];
          }
        }
      );
    }
  }

  editUser(): void {
    this.adminService.updateUser(this._id, this.editForm.value).subscribe((user) => {
      this.router.navigateByUrl('/admin/main/user-list');
    });
  }
}
