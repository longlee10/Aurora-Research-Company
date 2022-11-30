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