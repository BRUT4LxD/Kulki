import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';
import { KulkaComponent } from './kulka/kulka.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResultsComponent } from './results/results.component';


export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
   declarations: [
      AppComponent,
      BoardComponent,
      FieldComponent,
      KulkaComponent,
      GameComponent,
      HomeComponent,
      PageNotFoundComponent,
      LoginComponent,
      NavbarComponent,
      SignupComponent,
      SettingsComponent,
      ResultsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      RouterModule.forRoot([
         {path: 'home', component: HomeComponent},
         {path: 'game', component: GameComponent},
         {path: 'settings', component: SettingsComponent},
         {path: 'login', component: LoginComponent},
         {path: 'signup', component: SignupComponent},
         {path: '', component: LoginComponent},
         {path: '**', component: PageNotFoundComponent}
      ]),
      HttpClientModule,
      HttpClientJsonpModule,
      TranslateModule.forRoot({
         loader: {
         provide: TranslateLoader,
         useFactory: HttpLoaderFactory,
         deps: [HttpClient]
         }
      }),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
