import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../Models/game';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent  {

  constructor(private httpService: HttpService) {
  }
  @Input() title: string;
  @Input() games: Game[];
}
