import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {BoardElement} from '../Models/boardElement';
import {Resources} from '../resources';
import {KulkaColors} from '../Models/kulkaColors';
import {Position} from '../Models/position';
import {TranslateService} from '@ngx-translate/core';
import '../../styles.scss';
import { Game } from '../Models/game';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  notEnoughColors: boolean;
  runGame: boolean;
  myColors: boolean [];
  private listOfFreePlaces: Array<Position>;
  private isClicked = false;
  private clickedKulka: BoardElement;
  private futureKulkas: Array<KulkaColors>;
  private result = 0;
  private isGameOver: boolean;
  private resetClicked = false;
  private firstPlay = true;
  private Resources: {};
  public board: BoardElement[][];
  private date: Date;
  private games: Game[];
  private historyGames: Game[];

  constructor(private httpService: HttpService) {
    this.myColors = [true, true, true, true, true, true];
    this.notEnoughColors = false;
    this.runGame = false;
    this.date = new Date();
    this.Resources = Resources;
  }

  @ViewChild('main') mainDiv: ElementRef;

  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }

  ngOnInit() {
    this.resetBoard();
    this.getTop5Results();
    this.getHistoricGames();
  }

  initFutureKulkas() {
    this.futureKulkas = new Array<KulkaColors>();
    for (let index = 0; index < Resources.NUMBER_OF_PER_TOUR; index++) {
      this.futureKulkas.push(this.getRandomKulkaColor());
    }
  }

  isColor(event: MatCheckboxChange, num: number): void {
    this.myColors[num] = event.checked;
    let i;
    let sum = 0;
    for (i = 0; i < this.myColors.length; i++) {
      if (this.myColors[i] === true) {
        sum = sum + 1;
      }
    }
    if (sum < 3) {
      this.notEnoughColors = true;
    } else {
      this.notEnoughColors = false;
    }
    this.resetBoard();
  }

  startGame(): void {
    this.runGame = true;
  }

  resetBoard() {
    this.isGameOver = false;
    this.firstPlay = false;
    this.result = 0;
    this.date = new Date();
    this.initFutureKulkas();
    this.listOfFreePlaces = new Array<Position>();
    this.board = [];
    for (let i = 0; i < Resources.NUMBER_OF_ROWS; i++) {
      this.board[i] = [];
      for (let j = 0; j < Resources.NUMBER_OF_ROWS; j++) {
        this.board[i][j] = new BoardElement(false, KulkaColors.NoColor, new Position(j, i));
        this.listOfFreePlaces.push(new Position (j, i));
      }
    }
    this.addRandomKulkasOnBoard(Resources.NUMBER_OF_PER_TOUR);
    this.getFutureKulkas();
    this.runGame = false;
  }

  addGame() {
    const game = new Game();
    game.result = this.result;
    game.time = new Date().getSeconds() - this.date.getSeconds();
    this.resetClicked = !this.resetClicked;
    this.httpService.createGame(game)
      .subscribe(
        a => console.log('game created: ', a),
        err => console.log(err));
    this.getTop5Results();
    this.getHistoricGames();
  }
  getTop5Results() {
    this.httpService.getTop5Results()
          .subscribe( games => this.games = games,
            err => console.log(err));
  }
  getHistoricGames() {
    this.httpService.getTop100GamesByDate()
          .subscribe( games => this.historyGames = games,
            err => console.log(err));
  }

  processClick(boardElement: BoardElement) {
    this.displayListOfFreePlaces();
    if (this.listOfFreePlaces.length === 0) {
      if (!this.isGameOver) {
        this.addGame();
      }
      this.isGameOver = true;
      alert(Resources.LANGUAGE === 'en' ? 'GAME OVER' : 'KONIEC GRY');
      return;
    }
    this.isClicked = !this.isClicked;
    if (this.isClicked) {
      if (!boardElement.isOccupied) {
        this.isClicked = !this.isClicked;
        return;
      }
      this.clickedKulka = boardElement;
      return;
    }
    if ( this.clickedKulka.position.x === boardElement.position.x
      && this.clickedKulka.position.y === boardElement.position.y) {
        alert(Resources.LANGUAGE === 'en' ? 'You\'ve clicked on the same position' : 'Naciśnięto tę samą pozycję');
      return;
    }
    if (boardElement.isOccupied) {
      alert(Resources.LANGUAGE === 'en' ? 'You can\'t put ball on the ball' : 'Nie można postawić kuli na kuli');
      return;
    }
    this.changeKulkaPosition(boardElement.position);
    if (!this.checkMatch(boardElement.position)) {
      this.addRandomKulkasOnBoard(Resources.NUMBER_OF_PER_TOUR);
    }
    this.displayListOfFreePlaces();
    this.clickedKulka = this.board[boardElement.position.y][boardElement.position.x];
  }

  getFutureKulkas() {
    for (let i = 0; i < this.futureKulkas.length; i++) {
      this.futureKulkas[i] = this.getRandomKulkaColor();
    }
  }

  checkMatch(position: Position): boolean {
    const positionsToRemove = new Array<Position>();
    let tempPositions = new Array<Position>();

    tempPositions = this.checkHorizontal(position);
    tempPositions.forEach( e => positionsToRemove.push(new Position(e.x, e.y)));

    tempPositions = this.checkVertical(position);
    tempPositions.forEach( e => positionsToRemove.push(new Position(e.x, e.y)));

    tempPositions = this.checkDiagonal1(position);
    tempPositions.forEach( e => positionsToRemove.push(new Position(e.x, e.y)));

    tempPositions = this.checkDiagonal2(position);
    tempPositions.forEach( e => positionsToRemove.push(new Position(e.x, e.y)));

    positionsToRemove.forEach(element => {
      this.removeKulkaFromPosition(element.x, element.y);
    });
    this.result += positionsToRemove.length;
    return positionsToRemove.length > 0;
  }

  checkHorizontal(position: Position): Array<Position> {

    let tempPositions = new Array<Position>();
    let counter = 0;
    for ( let i = 0 ; i < 9; i++ ) {
      if (this.board[i][position.x].kulkaColor === this.board[position.y][position.x].kulkaColor ) {
        counter++;
        tempPositions.push(new Position(position.x, i));
      } else  if (counter < 5 ) {
        tempPositions = [];
        counter = 0;
      } else {
        break;
      }
    }

    if ( tempPositions.length < 5) {
      tempPositions = [];
    }

    return tempPositions;
  }
  checkVertical(position: Position): Array<Position> {
    let tempPositions = new Array<Position>();
    let counter = 0;
    for ( let i = 0 ; i < 9; i++ ) {
      if (this.board[position.y][i].kulkaColor === this.board[position.y][position.x].kulkaColor ) {
        counter++;
        tempPositions.push(new Position(i, position.y));
      } else  if (counter < 5 ) {
        tempPositions = [];
        counter = 0;
      } else {
        break;
      }
    }

    if ( tempPositions.length < 5) {
      tempPositions = [];
    }
    return tempPositions;
  }

  checkDiagonal1(position: Position): Array<Position> {
    let startx = 0;
    let starty = 0;
    if (position.x < position.y) {
      startx = 0;
      starty = position.y - position.x;
    } else {
      starty = 0;
      startx = position.x - position.y;
    }
    let tempPositions = new Array<Position>();
    let counter = 0;
    for ( let i = 0 ; i < 9; i++ ) {
      if ( starty + i > 8 || startx + i > 8) {
        break;
      }
      if (this.board[starty + i][startx + i].kulkaColor === this.board[position.y][position.x].kulkaColor ) {
        counter++;
        tempPositions.push(new Position(startx + i, starty + i));
      } else  if (counter < 5 ) {
        tempPositions = [];
        counter = 0;
      } else {
        break;
      }
    }

    if ( tempPositions.length < 5) {
      tempPositions = [];
    }

    return tempPositions;
  }

  checkDiagonal2(position: Position): Array<Position> {
    let startx = 0;
    let starty = 0;
    if (position.x > position.y) {
      starty = position.x + position.y > 8 ? 8 : position.x + position.y;
      startx = position.x + position.y > 8 ? (position.x + position.y) - 8 : 0;
    } else {
      starty = position.y + position.x > 8 ? 8 : position.y + position.x;
      startx = position.x + position.y > 8 ? (position.x + position.y) - 8 : 0;
    }
    let tempPositions = new Array<Position>();
    let counter = 0;
    for ( let i = 0 ; i < 9; i++ ) {
      if ( starty - i < 0 || startx + i > 8) {
        break;
      }
      if (this.board[starty - i][startx + i].kulkaColor === this.board[position.y][position.x].kulkaColor ) {
        counter++;
        tempPositions.push(new Position(startx + i, starty - i));
      } else  if (counter < 5 ) {
        tempPositions = [];
        counter = 0;
      } else {
        break;
      }
    }

    if ( tempPositions.length < 5) {
      tempPositions = [];
    }

    return tempPositions;
  }

  removeKulkaFromPosition(x: number, y: number) {
    this.board[y][x].isOccupied = false;
    this.board[y][x].kulkaColor = KulkaColors.NoColor;
    this.listOfFreePlaces.push(new Position(x, y));
  }

  addKulkaOnPosition(destination: Position) {
    this.board[destination.y][destination.x].isOccupied = true;
    this.board[destination.y][destination.x].kulkaColor = this.clickedKulka.kulkaColor;
    for (let i = 0; i < this.listOfFreePlaces.length; i++) {
      if (this.listOfFreePlaces[i].y === destination.y && this.listOfFreePlaces[i].x === destination.x) {
        this.listOfFreePlaces.splice(i, 1);
        break;
      }
    }
  }

  changeKulkaPosition(destination: Position) {
    this.addKulkaOnPosition(destination);
    this.removeKulkaFromPosition(this.clickedKulka.position.x, this.clickedKulka.position.y);

  }

  addRandomKulkasOnBoard(numberOfKulkas: number): void {
    for (let i = 0; i < numberOfKulkas; i++) {
      if (this.listOfFreePlaces.length === 0) {
        if (!this.isGameOver) {
          this.addGame();
        }
        this.isGameOver = true;
        alert(Resources.LANGUAGE === 'en' ? 'GAME OVER' : 'KONIEC GRY');
        return;
      }
      const randomPlace = Math.floor(Math.random() * this.listOfFreePlaces.length);
      const temp = this.listOfFreePlaces[randomPlace];
      this.board[temp.y][temp.x].isOccupied = true;
      this.board[temp.y][temp.x].kulkaColor = this.futureKulkas[i];
      if (!this.checkMatch(temp)) {
        this.listOfFreePlaces.splice(randomPlace, 1);
      }
    }
    this.getFutureKulkas();
  }

  getRandomKulkaColor(): KulkaColors {
    let value = Math.floor(Math.random() * 6) + 1;
    while (!this.myColors[value - 1] === true) {
      value = Math.floor(Math.random() * 6) + 1;
    }
    switch (value) {
      case 1:
        return KulkaColors.Red;
      case 2:
        return KulkaColors.Green;
      case 3:
        return KulkaColors.Orange;
      case 4:
        return KulkaColors.Purple;
      case 5:
        return KulkaColors.Pink;
      case 6:
        return KulkaColors.Blue;
    }
  }

  displayListOfFreePlaces() {
    let testBoard: any[] | boolean[][][][];
    testBoard = [];
    for (let i = 0; i < Resources.NUMBER_OF_ROWS; i++) {
      testBoard[i] = [];
      for (let j = 0; j < Resources.NUMBER_OF_ROWS; j++) {
        testBoard[i][j] = false;
      }
    }
    this.listOfFreePlaces.forEach(e => testBoard[e.y][e.x] = true);
  }


}
