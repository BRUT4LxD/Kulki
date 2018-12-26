import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public firstLanguage: string;
  public firstLanguageShort: string;
  public secondLanguage: string;
  public secondLanguageShort: string;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    console.log('changed language to ' + language);
    Resources.LANGUAGE = language;
    this.translate.use(language);
  }

  setLanguageOrder() {
    switch (Resources.LANGUAGE) {
      case 'en':
        this.firstLanguage = 'English';
        this.firstLanguageShort = 'en';
        this.secondLanguage = 'Polish';
        this.secondLanguageShort = 'pl';
        break;
      case 'pl':
        this.firstLanguage = 'Polski';
        this.firstLanguageShort = 'pl';
        this.secondLanguage = 'Angielski';
        this.secondLanguageShort = 'en';
        break;
      default:
        this.firstLanguage = 'English';
        this.firstLanguageShort = 'en';
        this.secondLanguage = 'Polish';
        this.secondLanguageShort = 'pl';
        break;
    }
  }
  ngOnInit() {
    this.setLanguageOrder();
  }

}
