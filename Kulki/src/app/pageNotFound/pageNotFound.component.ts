import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss']
})
export class PageNotFoundComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;
  
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
  }

}
