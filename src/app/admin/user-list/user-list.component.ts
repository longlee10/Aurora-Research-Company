import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/model/admin.service';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users: User[] = [];

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((user_list) => {
      if (!user_list.status) {
        this.Users = user_list;
      }
    });
  }

  deleteUser(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.adminService.deleteUser(id).subscribe((user) => {
        if (!user.status) {
          this.Users.splice(i, 1);
        }       
      });
    }
  }

}
