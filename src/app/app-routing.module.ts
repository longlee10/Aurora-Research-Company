import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ActiveComponent } from './survey/active/active.component';
import { AnswerComponent } from './survey/answer/answer.component';

const routes: Routes = [
  {path: 'landing', component: LandingComponent },
  {path: 'login', redirectTo: '/user/auth', pathMatch: 'full'},
  {path: 'survey/active', component: ActiveComponent },
  {path: 'survey/answer/:id', component: AnswerComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: 'landing', pathMatch: 'full' },
  {path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
