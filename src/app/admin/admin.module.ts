import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "./admin.guard";
import { AdminComponent } from "./admin.component";
import { MainComponent } from "./main/main.component";
import { SurveyListComponent } from "./survey-list/survey-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";

const routing = RouterModule.forChild([
  {
    path: 'main', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      { path: '', component: MainComponent, canActivate: [AdminGuard] },
      { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard] },
      { path: 'survey-list', component: SurveyListComponent, canActivate: [AdminGuard] },
      { path: 'user-list/edit-user/:id', component: UserEditComponent, canActivate: [AdminGuard] },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: 'main' }
]);

@NgModule({
  declarations: [AdminComponent, MainComponent, SurveyListComponent, UserEditComponent, UserListComponent],
  imports: [routing, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [],
  providers: [AdminGuard]
})
export class AdminModule { }