import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: UserComponent, canActivate: [AuthGuard],
   children: [
    {path: 'survey/list', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'survey/create', component: CreateComponent, canActivate: [AuthGuard]},
    {path: 'survey/edit/:id', component: EditComponent, canActivate: [AuthGuard]},
    {path: 'user/edit/:id', component: EditUserComponent, canActivate: [AuthGuard]},
    {path: 'survey/report/:id', component: ReportComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'survey/list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, UserComponent, ListComponent, CreateComponent, EditComponent, ReportComponent, RegisterComponent, EditUserComponent]
})
export class UserModule {}
