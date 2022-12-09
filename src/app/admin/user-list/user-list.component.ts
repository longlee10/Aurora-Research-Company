/*******************************
File Name: user-list.component.ts
Description: Define the behaviour of user list component
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
import { AdminService } from 'src/app/model/admin.service';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users: User[] = [];

  constructor(public adminService: AdminService, public authService: AuthService) { }

  ngOnInit(): void {
    let currentUser = this.authService.user;

    this.adminService.getUsers().subscribe((user_list) => {
      if (!user_list.status) {
        this.Users = user_list.filter(
          (user: { username: string; }) => user.username != currentUser?.username
        );
      }
    });
  }

  // to remove user
  deleteUser(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.adminService.deleteUser(id).subscribe((user) => {
        if (!user.status) {
          this.Users.splice(i, 1);
        }
      });
    }
  }

  // to disable user
  changeUserStatus(id?: string, newIsActive?: boolean) {
    if (window.confirm('Confirm to ' + (!newIsActive ? 'Deactivate' : 'Activate') + ' user?')) {
      this.adminService.updateUserStatus(id, newIsActive).subscribe((res) => {
        if (res) {
          let user = this.Users.find(x => x._id == id);
          if (user) {
            user.isActive = newIsActive;
          }
          if (window.confirm('Do you want to ' + (!newIsActive ? 'Deactivate' : 'Activate') + ' the surveys belonging to that user as well?')) {
            let user = this.Users.find(x => x._id == id);
            this.adminService.updateSurveysStatus(user?.username, newIsActive).subscribe((res) => { });
          }
        }
      });
    }
  }
}
