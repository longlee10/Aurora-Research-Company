import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './survey/create/create.component';
import { ListComponent } from './survey/list/list.component';
import { EditComponent } from './survey/edit/edit.component';
import { DetailComponent } from './survey/detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveComponent } from './survey/active/active.component';
import { FooterComponent } from './partials/footer/footer.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { UserEditComponent } from './pages/admin/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './pages/admin/main/main.component';
import { SurveyListComponent } from './pages/admin/survey-list/survey-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    DetailComponent,
    ActiveComponent,
    FooterComponent,
    UserListComponent,
    UserEditComponent,
    MainComponent,
    SurveyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
