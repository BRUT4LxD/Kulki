import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from './resources';
import { User } from './Models/user';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private httpService: HttpService) {
    translate.setDefaultLang(Resources.LANGUAGE);
    httpService.setGuest();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
