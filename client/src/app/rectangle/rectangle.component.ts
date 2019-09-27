import { Component } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RectangleService } from 'src/services/rectangle/rectangle.service';

@Component({
    selector: 'app-rectangle',
    templateUrl: './rectangle.component.html',
    styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent {

    constructor(private rectangleService: RectangleService,
                private paletteService: PaletteService) {

        this.rectangleService.SelectFillOpacity(1);
        this.rectangleService.SelectStrokeOpacity(1);
        this.rectangleService.SelectPointSize(1);
        this.rectangleService.SelectTraceType(1);
        this.paletteService.getPrimary();
        this.paletteService.getSecondary();
    }
}
