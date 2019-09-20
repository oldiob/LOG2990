import { Component } from '@angular/core';
import { PaletteService} from 'src/app/services/palette/palette.service';
import { RectangleService } from 'src/app/services/rectangle/rectangle.service';

      styleUrls: ['./rectangle.component.scss'],
  })
  export class RectangleComponent {

    rectangleService: RectangleService;
    constructor() {
        this.rectangleService = new RectangleService();
        this.paletteService.selectPrimary(0xff0000ff);
        this.paletteService.selectSecondary(0x00ff00ff);
    }
  }
