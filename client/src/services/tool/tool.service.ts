import { Injectable } from '@angular/core';
import { ToolCategory } from './tool-category';
import { Brush } from './tool-options/brush';
import { ITool } from './tool-options/i-tool';
import { Pencil } from './tool-options/pencil';
import { Rectangle } from './tool-options/rectangle';
import { Bucket } from './tool-options/bucket'
import { SVGService } from '../svg/svg.service';

/**
 * ToolService is used to access the current tool and to change tools ONLY.
 */
@Injectable({
    providedIn: 'root',
})
export class ToolService {

    private toolCategories: ToolCategory[];
    private toolCategoryIndex: number;

    constructor(svgService: SVGService) {
        let pencil: Pencil = new Pencil();
        let brush: Brush = new Brush();
        let bucket: Bucket = new Bucket(svgService);
        let rectangle: Rectangle = new Rectangle();
        let drawingTools: ToolCategory = new ToolCategory([
            pencil,
            brush,
            bucket,
            rectangle,
        ]);

        this.toolCategories = [drawingTools];
    }

    getToolCategoryFilename(categoryIndex: number): string {
        let currentIndex: number = this.toolCategoryIndex;
        this.setToolCategoryIndex(categoryIndex);
        let filename: string = this.getCurrentTool().FILENAME;
        this.toolCategoryIndex = currentIndex;

        return filename;
    }

    getToolFilename(toolIndex: number): string {
        return this.toolCategories[this.toolCategoryIndex].getFilename(toolIndex);
    }


    getToolCategoryIndex(): number {
        return this.toolCategoryIndex;
    }

    setToolCategoryIndex(toolCategoryIndex: number): void {
        if (!Number.isInteger(toolCategoryIndex)) {
            throw new Error('Tool category index is not an Integer.');
        }
        if (toolCategoryIndex >= this.toolCategories.length) {
            throw new Error('Tool category index is greater that the number of tools.');
        }
        if (toolCategoryIndex < 0) {
            throw new Error('Tool category index is negative.');
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
