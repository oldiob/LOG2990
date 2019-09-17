import { Component, OnInit } from '@angular/core';

import { ColorPalette } from '../../services/palette/palette.service';

@Component({
    selector: 'app-color-palette',
    templateUrl: './color-palette.component.html',
    styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements OnInit {

    constructor(private palette: ColorPalette) { }

    ngOnInit() {
    }
    swap() { this.palette.swap() }
}
