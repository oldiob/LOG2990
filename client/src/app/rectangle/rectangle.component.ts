import { Component } from '@angular/core';
import { RectangleService } from 'src/services/rectangle/rectangle.service';
import { PaletteService } from 'src/services/palette/palette.service';

@Component({
    selector: 'app-rectangle',
    templateUrl: './rectangle.component.html',
      styleUrls: ['./rectangle.component.scss'],
  })
  export class RectangleComponent {

    rectangleService: RectangleService;
    constructor(private paletteService : PaletteService) {
        this.rectangleService = new RectangleService();
        this.paletteService.selectPrimary(0xff00ffff);
        this.paletteService.selectSecondary(0x00ff00ff);
        this.rectangleService.SelectFillOpacity(1);
        this.rectangleService.SelectStrokeOpacity(1);
        this.rectangleService.SelectPointSize(1);
    }
  }
