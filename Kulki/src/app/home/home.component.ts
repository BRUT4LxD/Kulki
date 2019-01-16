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
    translate.setDefaultLang(Resources.LANGUAGE);
    this.temperature = this.getRandomNumber(1, 50);
  }
  private dayTime: Date;
  private temperature: number;
  private userName = 'Guest';
  private timeSpentPlaying: string;

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
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
    this.getTimeSpentPlaying();
  }
  getTimeSpentPlaying() {
    this.httpService.getTimeSpentPlaying(Resources.USER.id)
      .subscribe(time => time == null ? this.timeSpentPlaying = '0' : this.timeSpentPlaying = time);
  }
  getTime(): void {
    this.httpService.getTime().subscribe((a: any) => {
      this.dayTime = new Date(a.currentDateTime);
    });
  }
}
