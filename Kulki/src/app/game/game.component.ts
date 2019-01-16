import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Resources } from '../resources';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

  constructor() {
  }
  @ViewChild('main') mainDiv: ElementRef;
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = Resources.THEME;
  }
}
