import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Resources } from '../resources';
import '../../styles.scss';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss']
})
export class PageNotFoundComponent implements AfterViewInit {

  constructor() {
  }
  @ViewChild('main') mainDiv: ElementRef;

  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }

}
