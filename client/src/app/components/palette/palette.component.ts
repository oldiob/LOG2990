import { Component, OnInit } from '@angular/core';

import { PaletteService } from '../../services/palette/palette.service';

@Component({
    selector: 'app-palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss'],
})
export class PaletteComponent implements OnInit {

    constructor(private paletteService: PaletteService) { }

    ngOnInit() {
    }
    swap() { this.paletteService.swap() }
}
