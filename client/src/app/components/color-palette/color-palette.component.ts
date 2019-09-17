import { Component, OnInit } from '@angular/core';

import { PaletteService } from '../../services/palette/palette.service';

@Component({
    selector: 'app-color-palette',
    templateUrl: './color-palette.component.html',
    styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements OnInit {

    constructor(private palette: PaletteService) { }

    ngOnInit() {
    }
    swap() { this.palette.swap() }
}
