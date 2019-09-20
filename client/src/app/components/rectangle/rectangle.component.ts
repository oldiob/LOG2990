import { Component } from '@angular/core';
import { RectangleService } from 'src/app/services/rectangle/rectangle.service';
import { PaletteService} from 'src/app/services/palette/palette.service';

@Component({
    selector: 'app-rectangle',
    templateUrl: './rectangle.component.html',
      styleUrls: ['./rectangle.component.scss'],
  })
  export class RectangleComponent {

    rectangleService: RectangleService;
    constructor() {
        this.rectangleService = new RectangleService();
    }
  }
