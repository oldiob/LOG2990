import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { ToolService } from 'src/services/tool/tool.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

export enum OptionType {
  COLOR = 0,
  TOOL = 1,
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  private FILE_LOCATION = '../../../assets/images/';

  currentDisplayedOption: OptionType;
  optionDisplayed: boolean;

  constructor(
    private toolService: ToolService,
    private paletteService: PaletteService,
    private dialogService: DialogService,
    private drawAreaService: DrawAreaService) {
    this.currentDisplayedOption = OptionType.TOOL;
    this.optionDisplayed = false;
  }

  ngOnInit() {
    //
  }

  getPrimaryColor(): string {
    return this.paletteService.getPrimary();
  }

  getSecondaryColor(): string {
    return this.paletteService.getSecondary();
  }

  private displayOption(optionType: OptionType): void {
    this.optionDisplayed = this.optionDisplayed === true ? this.currentDisplayedOption !== optionType : true;
    this.currentDisplayedOption = optionType;
  }

  getButtonFilesource(category: number): string {
    return this.FILE_LOCATION + this.toolService.getToolCategoryFilename(category);
  }

  getOptionTopMargin(): number {
    return this.currentDisplayedOption * 50;
  }

  getToolCategory(): number {
    return this.toolService.getToolCategoryIndex();
  }

  chooseColor() {
    this.displayOption(OptionType.COLOR);
  }

  chooseWorkingTool() {
    this.displayOption(OptionType.TOOL);

    this.toolService.setToolCategoryIndex(0);
  }

  newDrawingOption() {
    this.dialogService.openNewDrawing(NewDrawingComponent, this.drawAreaService.isSaveDrawing);
  }
  saveImage() {
    this.drawAreaService.save();
    alert('saved');
  }
}
