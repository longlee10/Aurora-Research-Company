import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './survey/create/create.component';
import { EditComponent } from './survey/edit/edit.component';
import { ListComponent } from './survey/list/list.component';
import { ActiveComponent } from './survey/active/active.component';

const routes: Routes = [
  {path: 'landing', component: LandingComponent },
  {path:'login', component: LoginComponent},
  {path: 'survey/list', component: ListComponent },
  {path: 'survey/active', component: ActiveComponent },
  {path: 'survey/create', component: CreateComponent },
  {path: 'survey/edit/:id', component: EditComponent },
  {path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
