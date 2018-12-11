import { KulkaColors } from './kulkaColors';
import { Position } from './position';

export class BoardElement {
    isOccupied: boolean;
    kulkaColor: KulkaColors;
    position: Position;
    constructor(isOccupied: boolean, kulkaColor: KulkaColors, position: Position) {
        this.isOccupied = isOccupied;
        this.kulkaColor = kulkaColor;
        this.position = position;
    }
}
