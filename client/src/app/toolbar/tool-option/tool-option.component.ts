import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
  selector: 'app-tool-option',
  templateUrl: './tool-option.component.html',
  styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
  private readonly FILE_LOCATION = '../../../../assets/images/';

  thickness: number;
  currentlySelectedIndex: number;

  constructor(private toolService: ToolService) {
    this.currentlySelectedIndex = toolService.getCurrentToolIndex();
    this.thickness = 20;
  }

  ngOnInit() {
    //
  }

  selectNthTool(toolIndex: number): void {
    this.toolService.setCurrentToolIndex(toolIndex);
    this.currentlySelectedIndex = this.toolService.getCurrentToolIndex();
  }

  getNthFilesource(toolIndex: number): string {
    return this.FILE_LOCATION + this.toolService.getToolFilename(toolIndex);
  }

  setThickness() {
    //
  }

}
