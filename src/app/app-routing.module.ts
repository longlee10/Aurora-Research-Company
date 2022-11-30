import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

import { ActiveComponent } from './survey/active/active.component';
import { AnswerComponent } from './survey/answer/answer.component';
import { RegisterComponent } from './user/register/register.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditComponent } from './user/edit/edit.component';

const routes: Routes = [
  {path: 'landing', component: LandingComponent },
  {path: 'login', redirectTo: '/user/auth', pathMatch: 'full'},
  {path: 'user/register', component: RegisterComponent},
  {path: 'survey/active', component: ActiveComponent },
  {path: 'user/edit/:id', component :EditUserComponent},
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
