import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/app/services/palette/palette.service';

@Component({
  selector: 'app-color-option',
  templateUrl: './color-option.component.html',
  styleUrls: ['./color-option.component.scss', '../toolbar-option.scss'],
})
export class ColorOptionComponent implements OnInit {

  private paletteService: PaletteService;

  constructor(paletteService: PaletteService) { 
    this.paletteService = paletteService;

    this.paletteService.selectPrimary(3213);
    this.paletteService.selectSecondary(18621);
  }

  ngOnInit() {
  }

  getPrimary(): string {
    return this.paletteService.getPrimary();
  }

  getSecondary(): string {
    return this.paletteService.getSecondary();
  }

  swap(): void {
    this.paletteService.swap();
  }

}
