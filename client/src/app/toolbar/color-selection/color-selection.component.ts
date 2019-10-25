import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
})
export class ColorSelectionComponent implements OnInit {

  readonly IS_PRIMARY = true;

  constructor(private paletteService: PaletteService) {
    //
  }

  ngOnInit() {
    //
  }

  onSwap(): void {
    this.paletteService.swap();
  }

}
