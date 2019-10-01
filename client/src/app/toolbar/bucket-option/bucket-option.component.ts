import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { BucketTool } from 'src/services/tool/tool-options/bucket';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
  selector: 'app-bucket-option',
  templateUrl: './bucket-option.component.html',
  styleUrls: ['./bucket-option.component.scss', '../toolbar-option.scss'],
})
export class BucketOptionComponent implements OnInit {
  private readonly FILE_LOCATION = '../../../../assets/images/';

  currentTool: ITool;

  isShowPrimary: boolean;
  isShowSecondary: boolean;
  primaryColor: string;
  secondaryColor: string;

  constructor(
    private paletteService: PaletteService,
    private toolService: ToolService,
    private bucket: BucketTool) {}

  ngOnInit() {
    this.currentTool = this.bucket;
    this.isShowPrimary = false;
    this.isShowSecondary = false;
  }

  selectTool(tool: ITool): void {
    this.currentTool = tool;
    this.toolService.currentTool = tool;
  }

  getFilesource(tool: ITool): string {
    return this.FILE_LOCATION + tool.BUTTON_FILENAME;
  }


  togglePrimaryColorPicker() {
    this.isShowSecondary = false;
    this.isShowPrimary = !this.isShowPrimary;
  }

  toggleSecondaryColorPicker() {
    this.isShowPrimary = false;
    this.isShowSecondary = !this.isShowSecondary;
  }

  onSwap() {
    this.paletteService.swap();
    this.setPrimaryColor();
    this.setSecondary();
  }

  onColorPick() {
    this.isShowPrimary ? this.setPrimaryColor() : this.setSecondary();
    this.hideColorPicker();
}

hideColorPicker() {
    this.isShowPrimary ? this.isShowPrimary = false
        : this.isShowSecondary = false;
}

  private setPrimaryColor() {
    return {
      'background-color': this.paletteService.getPrimary(),
    };
  }

  private setSecondary() {
    return {
      'background-color': this.paletteService.getSecondary(),
    };
  }

}
