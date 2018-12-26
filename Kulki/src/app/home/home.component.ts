import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  public dayTime = '11:20';
  public temperature = '22';
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
  }

}
