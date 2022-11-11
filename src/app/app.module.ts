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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
