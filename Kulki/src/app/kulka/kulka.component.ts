import { Component, OnInit, Input } from '@angular/core';
import { KulkaColors } from '../Models/kulkaColors';

@Component({
  selector: 'app-kulka',
  templateUrl: './kulka.component.html',
  styleUrls: ['./kulka.component.scss']
})
export class KulkaComponent implements OnInit {

  @Input() color: string;

  public kulkaColor: KulkaColors;
  constructor() {
  }

  ngOnInit() {
  }
  getKulkaColor(): string {

    console.log(this.color);
    return this.color;
  }

}
