import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

import { ActiveComponent } from './survey/active/active.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { UserEditComponent } from './pages/admin/user-edit/user-edit.component';
import { MainComponent } from './pages/admin/main/main.component';
import { SurveyListComponent } from './pages/admin/survey-list/survey-list.component';
import { AnswerComponent } from './survey/answer/answer.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: 'landing', component: LandingComponent },
  {path: 'login', redirectTo: '/user/auth', pathMatch: 'full'},
  {path: 'user/register', component: RegisterComponent},
  {path: 'survey/active', component: ActiveComponent },
  {path: 'survey/answer/:id', component: AnswerComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: '', redirectTo: 'landing', pathMatch: 'full' },
  {path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
