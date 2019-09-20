import { Component } from '@angular/core';
import { PaletteService} from 'src/app/services/palette/palette.service';

      styleUrls: ['./rectangle.component.scss'],
  })
  export class RectangleComponent {

    rectangleService: RectangleService;
    constructor() {
        this.rectangleService = new RectangleService();
    }
  }
