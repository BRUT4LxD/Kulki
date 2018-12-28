import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  public firstLanguage: string;
  public firstLanguageShort: string;
  public secondLanguage: string;
  public secondLanguageShort: string;
  public theme = Resources.THEME;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    console.log(this.theme);
  }
  @ViewChild('main') mainDiv: ElementRef;

  ngAfterViewInit(): void {
    console.log('Change theme to: ' + 'main-view ' + Resources.THEME);
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    Resources.LANGUAGE = language;
    this.translate.use(language);
  }

  setLanguageOrder() {
    switch (Resources.LANGUAGE) {
      case 'en':
        this.firstLanguage = 'English';
        this.firstLanguageShort = 'en';
        this.secondLanguage = 'Polski';
        this.secondLanguageShort = 'pl';
        break;
      case 'pl':
        this.firstLanguage = 'Polski';
        this.firstLanguageShort = 'pl';
        this.secondLanguage = 'English';
        this.secondLanguageShort = 'en';
        break;
      default:
        this.firstLanguage = 'English';
        this.firstLanguageShort = 'en';
        this.secondLanguage = 'Polski';
        this.secondLanguageShort = 'pl';
        break;
    }
  }
  switchTheme(theme: string) {
    Resources.THEME = theme;
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
    console.log('change theme to: ' + theme);
  }
  ngOnInit() {
    this.setLanguageOrder();
  }

}
