import { Component, OnInit } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
  selector: 'app-airbrush-option',
  templateUrl: './airbrush-option.component.html',
  styleUrls: ['./airbrush-option.component.scss']
})
export class AirbrushOptionComponent implements OnInit, IOption<ITool>  {
  tip: string;
  images: Map<ITool, string>;

  private readonly FILE_LOCATION = '../../../../assets/images/';

  tools: ITool[];
  currentTool: ITool;

  constructor(private toolService: ToolService) {
    //
   }

  ngOnInit() {
    //
  }
  select(): void {
    this.selectTool(this.currentTool);
  }
  getImage(): string {
    throw new Error('Method not implemented.');
  }
  selectTool(tool: ITool): void {
    this.currentTool = tool;
    this.toolService.currentTool = tool;
}
getFilesource(tool: ITool): string {
  return this.FILE_LOCATION + this.images.get(tool) as string;
}

}
