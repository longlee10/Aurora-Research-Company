import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActiveComponent } from './survey/active/active.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AnswerComponent } from './survey/answer/answer.component';
import { SurveysService } from './model/surveys.service';
import { AuthService } from './model/auth.service';
import { SharedModule } from './shared/share.module';

export function jwtTokenGetter(): string | null
{
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    ActiveComponent,
    FooterComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [SurveysService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private auth: AuthService) {
    // Logout if the token expired, a better solution should be examined later
    if(!auth.authenticated) {
      auth.logout();
    }
  }
 }
