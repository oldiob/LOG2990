import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool/tool.service';

export enum OptionType {
	COLOR = 0,
	TOOL = 1,
	SHAPE = 2,
};


@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

	private toolService: ToolService;

	currentDisplayedOption: OptionType;
	optionDisplayed: boolean;

	constructor(toolService: ToolService) {
		this.toolService = toolService;

		this.currentDisplayedOption = OptionType.TOOL;
		this.optionDisplayed = false;
	}

	ngOnInit() {
	}

	getOptionTopMargin(): number {
		return this.currentDisplayedOption * 48;
	}


	getToolCategory(): number {
		return this.toolService.getToolCategoryIndex();
	}

	chooseColor() {
		this.currentDisplayedOption = OptionType.COLOR;
		this.optionDisplayed = true;
	}

	chooseWorkingTool() {
		this.currentDisplayedOption = OptionType.TOOL;
		this.optionDisplayed = true;

		this.toolService.setToolCategoryIndex(0);
	}

	chooseShape() {
		this.currentDisplayedOption = OptionType.SHAPE;
		this.optionDisplayed = true;

		this.toolService.setToolCategoryIndex(1);
	}




	newDrawingOption() {

	}
	saveImage() {

	}
}
