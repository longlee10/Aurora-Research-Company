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
import { SharedModule } from '../shared/share.module';

// Chart related import
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
    {path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard]},
   {path: 'edit-password', component: EditPasswordComponent, canActivate: [AuthGuard]},
   {path: 'register', component: RegisterComponent},
   {path: 'main', component: UserComponent, canActivate: [AuthGuard],
   children: [
    {path: 'survey/list', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'survey/create', component: CreateComponent, canActivate: [AuthGuard]},
    {path: 'survey/edit/:id', component: EditComponent, canActivate: [AuthGuard]},
    {path: 'survey/report/:id', component: ReportComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'survey/list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    routing,
    NgxEchartsModule.forRoot({ echarts }),
    SharedModule
  ],
  providers: [
    AuthGuard
  ],
  declarations: [
    AuthComponent, 
    UserComponent, 
    ListComponent, 
    CreateComponent, 
    EditComponent, 
    ReportComponent, 
    RegisterComponent,
    EditUserComponent,
    EditPasswordComponent
  ]
})
export class UserModule {}
