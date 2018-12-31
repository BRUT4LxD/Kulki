import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('main') mainDiv: ElementRef;

  constructor(private translate: TranslateService, private httpService: HttpService) {
    translate.setDefaultLang('en');
  }
  private dayTime: Date;
  private temperature = '22';
  private userName = 'thisisme';

  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
    this.getTime();
    this.userName = Resources.IS_LOGGED_IN ? Resources.USER.name : '';
  }
  getTime(): void {
    this.httpService.getTime().subscribe((a: any) => {
      this.dayTime = new Date(a.currentDateTime);
    });
  }
}
