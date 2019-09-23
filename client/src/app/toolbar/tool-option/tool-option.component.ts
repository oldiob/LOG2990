import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
  selector: 'app-tool-option',
  templateUrl: './tool-option.component.html',
  styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
  private FILE_LOCATION: string = "../../../../assets/images/";

  currentlySelectedIndex: number;

  constructor(private toolService: ToolService) { 
    this.currentlySelectedIndex = toolService.getCurrentToolIndex();
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

}
