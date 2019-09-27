import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';

export enum OptionType {
  TOOL = 0,
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

  chooseWorkingTool() {
    this.displayOption(OptionType.TOOL);

    this.toolService.setToolCategoryIndex(0);
  }

  newDrawingOption() {
    this.dialogService.openNewDrawing();
  }
  saveImage() {
    this.drawAreaService.save();
  }
}
