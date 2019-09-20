import { Component } from '@angular/core';
import { PaletteService} from 'src/app/services/palette/palette.service';
import { RectangleService } from 'src/app/services/rectangle/rectangle.service';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})

  export class RectangleComponent {


    rectangleService: RectangleService;
    constructor(private paletteService: PaletteService) {
        this.rectangleService = new RectangleService();
        this.paletteService.selectPrimary(0xfffaa8ff);
        this.paletteService.selectSecondary(0xff00ffff);
        this.rectangleService.SelectPointSize(30);
        this.rectangleService.SelectFillOpacity(1);
        this.rectangleService.SelectStrokeOpacity(1);
    }
  }
