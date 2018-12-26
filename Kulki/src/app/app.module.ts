import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';
import { KulkaComponent } from './kulka/kulka.component';
import { MainViewComponent } from './mainView/mainView.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
   declarations: [
      AppComponent,
      BoardComponent,
      FieldComponent,
      KulkaComponent,
      MainViewComponent,
      GameComponent,
      HomeComponent,
      PageNotFoundComponent,
      LoginComponent,
      LogoutComponent,
      NavbarComponent,
      SignupComponent,
      SettingsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot([
         {path: 'home', component: HomeComponent},
         {path: 'game', component: GameComponent},
         {path: 'settings', component: SettingsComponent},
         {path: 'login', component: LoginComponent},
         {path: 'signup', component: SignupComponent},
         {path: '', component: LoginComponent},
         {path: '**', component: PageNotFoundComponent}
      ])
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }