import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../Models/game';
import { HttpClient } from '@angular/common/http';
import { Resources } from '../resources';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  private getByUserIdUrl = 'http://localhost:8080/game/';
  private games: Game[];
  ngOnInit() {
    this.getTop5Results();
  }
  getTop5Results() {
    this.http.get<Game[]>(`${this.getByUserIdUrl}${Resources.USER.id}`)
          .subscribe( games => this.games = games,
            err => console.log(err),
            () => {
              console.log('Top Results fetched: ', this.games);
            });
  }

}
