import { Component } from '@angular/core';
import { RectangleService } from 'src/services/rectangle/rectangle.service';
import { PaletteService } from 'src/services/palette/palette.service';

@Component({
    selector: 'app-rectangle',
    templateUrl: './rectangle.component.html',
    styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent {


    constructor(private paletteService: PaletteService,
        private rectangleService: RectangleService) {

        this.rectangleService.SelectFillOpacity(1);
        this.rectangleService.SelectStrokeOpacity(1);
        this.rectangleService.SelectPointSize(1);
        this.rectangleService.SelectTraceType(1);
    }
}
