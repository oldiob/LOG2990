import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { ToolService } from 'src/services/tool/tool.service';

export enum OptionType {
	COLOR = 0,
	HAND = 1,
	TOOL = 2,
};


@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
	private FILE_LOCATION: string = "../../../assets/images/";

	currentDisplayedOption: OptionType;
	optionDisplayed: boolean;

	constructor(private toolService: ToolService, private paletteService: PaletteService) {
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
		this.optionDisplayed = this.optionDisplayed == true ? this.currentDisplayedOption != optionType : true;
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

	chooseHand() {
		this.displayOption(OptionType.HAND);

		this.toolService.setToolCategoryIndex(1);
	}

	chooseWorkingTool() {
		this.displayOption(OptionType.TOOL);

		this.toolService.setToolCategoryIndex(0);
	}



	newDrawingOption() {
		//
	}
	saveImage() {
		//
	}
}
