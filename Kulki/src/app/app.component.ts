import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from './resources';
import { User } from './Models/user';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kulki';
  constructor(private translate: TranslateService, private http: HttpClient) {
    this.loadSetting();
    translate.setDefaultLang(Resources.LANGUAGE);
    Resources.USER = this.setUser();
  }

  private settingsUrl = '/assets/settings.json';

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  setUser(): User {
    const user = new User();
    user.name = 'Pawel';
    user.id = '1';
    user.email = 'tarsala95@gmail.com';
    user.password = 'admin';

    return user;
  }
  loadSetting() {
    this.http.get(this.settingsUrl).subscribe( (a: any) => {
      Resources.LANGUAGE = a.language;
      Resources.THEME = a.theme;
    }, err => console.log(err),
    () => {
      console.log( Resources.THEME);
    });

  }
}
