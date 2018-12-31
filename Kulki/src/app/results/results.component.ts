import { Component, OnInit } from '@angular/core';
import { Game } from '../Models/game';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private httpService: HttpService) {
  }

  private games: Game[];
  ngOnInit() {
    this.getTop5Results();
  }
  getTop5Results() {
    this.httpService.getTop5Results()
          .subscribe( games => this.games = games,
            err => console.log(err),
            () => {
              console.log('Top Results fetched: ', this.games);
            });
  }

}
