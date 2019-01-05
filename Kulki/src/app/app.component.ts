import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from './resources';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private httpService: HttpService) {
    this.loadSetting();
    translate.setDefaultLang(Resources.LANGUAGE);
    httpService.setGuest();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  loadSetting() {
    this.httpService.getSettings().subscribe( (a: any) => {
      Resources.LANGUAGE = a.language;
      Resources.THEME = a.theme;
    }, err => console.log(err),
    () => {
      this.switchLanguage(Resources.LANGUAGE);
    });
  }
}
