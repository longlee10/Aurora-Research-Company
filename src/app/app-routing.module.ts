import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './survey/create/create.component';
import { EditComponent } from './survey/edit/edit.component';
import { ListComponent } from './survey/list/list.component';
import { ActiveComponent } from './survey/active/active.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { UserEditComponent } from './pages/admin/user-edit/user-edit.component';
import { MainComponent } from './pages/admin/main/main.component';
import { SurveyListComponent } from './pages/admin/survey-list/survey-list.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'survey/list', component: ListComponent },
  { path: 'survey/active', component: ActiveComponent },
  { path: 'survey/create', component: CreateComponent },
  { path: 'survey/edit/:id', component: EditComponent },
  { path: 'admin/main', component: MainComponent, canActivate: [AdminGuard] },
  { path: 'admin/main/user-list', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'admin/main/survey-list', component: SurveyListComponent, canActivate: [AdminGuard] },
  { path: 'admin/main/user-list/edit-user/:id', component: UserEditComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
