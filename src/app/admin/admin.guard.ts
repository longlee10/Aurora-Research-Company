/*******************************
File Name: admin.guard.ts
Description: Define function to validate the admin permission
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "src/app/model/auth.service";

@Injectable()
export class AdminGuard {
    path: ActivatedRouteSnapshot[] = [];
    route?: ActivatedRouteSnapshot;
    constructor(private router: Router, private user: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.user.authenticated && this.user.user?.role == 'admin') {
            return true;
        } else {
            this.router.navigate(['/landing']);
            return false;
        }
    }
}