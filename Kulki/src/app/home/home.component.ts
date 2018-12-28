import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import '../../styles.scss';
import { Observable } from 'rxjs';

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

  public url = 'http://worldclockapi.com/api/json/utc/now';
  public dayTime: Date;
  public temperature = '22';

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
  }
  getTime(): void {
    this.http.get(this.url).subscribe((a: any) => {
      this.dayTime = new Date(a.currentDateTime);
    });
  }
}
