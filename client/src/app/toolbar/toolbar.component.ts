import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { ToolService } from 'src/services/tool/tool.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

export enum OptionType {
	COLOR = 0,
	TOOL = 1,
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

	chooseWorkingTool() {
		this.displayOption(OptionType.TOOL);

		this.toolService.setToolCategoryIndex(0);
	}



<<<<<<< HEAD
	newDrawingOption() {
		//
	}
	saveImage() {
		//
	}
=======
currentDisplayedOption: OptionType;
optionDisplayed: boolean;

constructor(
  private toolService: ToolService,
  private paletteService: PaletteService,
  private dialogService: DialogService) {
 this.currentDisplayedOption = OptionType.TOOL;
 this.optionDisplayed = false;
}

ngOnInit() {
//
}

    get primaryColor(): string {
        return this.paletteService.getPrimary();
    }

    get secondaryColor(): string {
        return this.paletteService.getSecondary();
    }

    get optionTopMargin(): number {
        return this.currentDisplayedOption * 48;
    }

    get toolCategory(): number {
        return this.toolService.getToolCategoryIndex();
    }

    chooseColor() {
        this.currentDisplayedOption = OptionType.COLOR;
        this.optionDisplayed = true;
    }

    chooseWorkingTool() {
        // TODO - Coverage me
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = true;
        this.toolService.setToolCategoryIndex(0);
    }

    chooseShape() {
        // TODO - Coverage me
        this.currentDisplayedOption = OptionType.SHAPE;
        this.optionDisplayed = true;
        this.toolService.setToolCategoryIndex(1);
    }

<<<<<<< HEAD
    newDrawingOption() {
        //
    }
    saveImage() {
        //
    }
=======
newDrawingOption() {
  // Avoid welcome entry dialog pop up
  const IS_OPEN_ENTRY_DIALOG = false;
  this.dialogService.openNewDrawing(NewDrawingComponent, IS_OPEN_ENTRY_DIALOG);
}
saveImage() {
//
}
>>>>>>> Fix NewDrawing modal pop up from toolbar
>>>>>>> Fix NewDrawing modal pop up from toolbar
}
