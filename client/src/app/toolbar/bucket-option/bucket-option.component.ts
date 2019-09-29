import { Component, OnInit } from '@angular/core';
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

  constructor(private toolService: ToolService, private bucket: BucketTool) {
    this.selectTool(this.bucket);
  }

  ngOnInit() {
    //
  }

  selectTool(tool: ITool): void {
    this.currentTool = tool;
    this.toolService.currentTool = tool;
  }

  getFilesource(tool: ITool): string {
    return this.FILE_LOCATION + tool.BUTTON_FILENAME;
  }

}
