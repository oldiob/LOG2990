import { Injectable } from '@angular/core';
import { ToolCategory } from './tool-category';
import { Pencil } from './tool-options/pencil';
import { Brush } from './tool-options/brush';
import { Rectangle } from './tool-options/rectangle';
import { ITool } from './tool-options/i-tool';
import { NavigationHand } from './tool-options/navigation-hand';

@Injectable({
    providedIn: 'root',
})
export class ToolService {

    private toolCategories: ToolCategory[];
    private toolCategoryIndex: number;

    constructor() {

        let pencil: Pencil = new Pencil();
        let brush: Brush = new Brush();
        let rectangle: Rectangle = new Rectangle();
        let drawingTools: ToolCategory = new ToolCategory([
            pencil,
            brush,
            rectangle,
        ]);


        let navigationHand: NavigationHand = new NavigationHand();
        let navigationHandCategory: ToolCategory = new ToolCategory([
            navigationHand,
        ]);

        this.toolCategories = [drawingTools, navigationHandCategory];
        this.toolCategoryIndex = 0;
    }


    getToolCategoryIndex(): number {
        return this.toolCategoryIndex;
    }

    setToolCategoryIndex(toolCategoryIndex: number): void {
        if (!Number.isInteger(toolCategoryIndex)) {
            throw new Error("Tool category index is not an Integer.");
        }
        if (toolCategoryIndex >= this.toolCategories.length) {
            throw new Error("Tool category index is greater that the number of tools.")
        }
        if (toolCategoryIndex < 0) {
            throw new Error("Tool category index is negative.")
        }

        this.toolCategoryIndex = toolCategoryIndex;
    }


    getCurrentToolIndex(): number {
        return this.toolCategories[this.toolCategoryIndex].getToolIndex();
    }

    setCurrentToolIndex(currentToolIndex: number): void {
        this.toolCategories[this.toolCategoryIndex].selectTool(currentToolIndex);
    }
    

    getCurrentTool(): ITool {
        return this.toolCategories[this.toolCategoryIndex].getCurrentTool();
    }

}
