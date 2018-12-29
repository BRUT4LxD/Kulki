import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import '../../styles.scss';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('main') mainDiv: ElementRef;

  constructor(private translate: TranslateService, private http: HttpClient) {
    translate.setDefaultLang('en');
  }

  private weatherUrl = 'http://worldclockapi.com/api/json/utc/now';
  private dayTime: Date;
  private temperature = '22';
  private userName = 'thisisme';

  ngAfterViewInit(): void {
    console.log('Change theme to: ' + 'main-view ' + Resources.THEME);
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
    this.getTime();
    this.userName = Resources.USER != null ? Resources.USER.name : 'NoName';
  }
  getTime(): void {
    this.http.get(this.weatherUrl).subscribe((a: any) => {
      this.dayTime = new Date(a.currentDateTime);
    });
  }
}
