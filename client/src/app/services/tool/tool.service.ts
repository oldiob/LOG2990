import { Injectable } from '@angular/core';
import { ToolCategory } from './tool-category';
import { Pencil } from './tool-options/pencil';
import { Brush } from './tool-options/brush';
import { Rectangle } from './tool-options/rectangle';
import { ITool } from './tool-options/i-tool';

@Injectable({
    providedIn: 'root',
})
export class ToolService {

    private toolCategories: ToolCategory[];
    private toolCategoryIndex: number;

    constructor() {

        let pencil: Pencil = new Pencil();
        let brush: Brush = new Brush();
        let drawingTools: ToolCategory = new ToolCategory([
            pencil,
            brush,
        ]);


        let rectangle: Rectangle = new Rectangle();
        let shapeTools: ToolCategory = new ToolCategory([
            rectangle,
        ]);

        this.toolCategories = [drawingTools, shapeTools];

        this.toolCategoryIndex = 0;
    }


    getToolCategoryIndex(): number {
        return this.toolCategoryIndex;
    }

    setToolCategoryIndex(toolCategoryIndex: number): void {
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
