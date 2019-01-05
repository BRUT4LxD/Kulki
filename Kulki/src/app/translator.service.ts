import { Injectable } from '@angular/core';
import { Resources } from './resources';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(Resources.LANGUAGE);
  }
  switchLanguage(language: string) {
    Resources.LANGUAGE = language;
    this.translate.use(language);
  }
}
