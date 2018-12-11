import { Component, OnInit } from '@angular/core';
import { BoardElement } from '../Models/boardElement';
import { Resources } from '../resources';
import { KulkaColors } from '../Models/kulkaColors';
import { Position } from '../Models/position';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private listOfFreePlaces: Array<Position>;
  private isClicked = false;
  private clickedKulka: BoardElement;
  public board: BoardElement[][];
  constructor() {
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
  }

  processClick(boardElement: BoardElement): void {

    if (this.listOfFreePlaces.length === 0) {
      console.log('!!!!GAME OVER!!!!!');
      return;
    }
    this.isClicked = !this.isClicked;
    if (this.isClicked) {
      if (!boardElement.isOccupied) {
        this.isClicked = !this.isClicked;
        return;
      }
      this.clickedKulka = boardElement;
      console.log('Clicked Kulka');
      console.log(this.clickedKulka);
      return;
    }

    console.log('Board Element');
    console.log(boardElement);

    if ( this.clickedKulka.position.x === boardElement.position.x
      && this.clickedKulka.position.y === boardElement.position.y) {
        console.log('You\'ve clicked on the same position');
      return;
    }

    this.changeKulkaPosition(boardElement.position);
    this.addRandomKulkasOnBoard(Resources.NUMBER_OF_PER_TOUR);

  }
  removeKulkaFromPosition(x: number, y: number) {
    this.board[y][x].isOccupied = false;
    this.board[y][x].kulkaColor = KulkaColors.NoColor;
    this.listOfFreePlaces.push(new Position(this.clickedKulka.position.x, this.clickedKulka.position.y));
    this.listOfFreePlaces.filter( e => e.y !== y && e.x !== x);
  }
  addKulkaOnPosition(destination: Position) {
    this.board[destination.y][destination.x].isOccupied = true;
    this.board[destination.y][destination.x].kulkaColor = this.clickedKulka.kulkaColor;
  }
  changeKulkaPosition(destination: Position) {
    this.addKulkaOnPosition(destination);
    this.removeKulkaFromPosition(this.clickedKulka.position.x, this.clickedKulka.position.y);

  }
  addRandomKulkasOnBoard(numberOfKulkas: number): void {

    for (let i = 0; i < numberOfKulkas; i++) {
      if (this.listOfFreePlaces.length === 0) {
        console.log('!!!!   GAME OVER   !!!!');
        return;
      }
      const randomPlace = Math.floor(Math.random() * this.listOfFreePlaces.length);
      const temp = this.listOfFreePlaces[randomPlace];
      this.board[temp.y][temp.x].isOccupied = true;
      this.board[temp.y][temp.x].kulkaColor = this.getRandomKulkaColor();
      this.listOfFreePlaces.splice(randomPlace, 1);
      console.log(this.listOfFreePlaces.length);

    }
    console.log(this.listOfFreePlaces);
  }

  getRandomKulkaColor(): KulkaColors {
    const value = Math.floor(Math.random() * 3) + 1;
    switch (value) {
      case 1:
        return KulkaColors.Red;
      case 2:
        return KulkaColors.Blue;
      case 3:
        return KulkaColors.Green;
    }
  }

  ngOnInit() {

  }

}
