import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { AdminService } from "src/app/model/admin.service";

@Injectable()
export class AdminGuard {
    path: ActivatedRouteSnapshot[] = [];
    route?: ActivatedRouteSnapshot;
    constructor(private router: Router, private admin: AdminService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.admin.authenticated) {
            return true;
        } else {
            this.router.navigate(['/landing']);
            return false;
        }
    }
}