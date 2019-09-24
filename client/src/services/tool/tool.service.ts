import { Injectable } from '@angular/core';
import { ToolCategory } from './tool-category';
import { Brush } from './tool-options/brush';
import { ITool } from './tool-options/i-tool';
import { NavigationHand } from './tool-options/navigation-hand';
import { Pencil } from './tool-options/pencil';
import { Rectangle } from './tool-options/rectangle';
import { BucketService } from './tool-options/bucket'
import { SVGService } from 'src/services/svg/svg.service';

@Injectable({
    providedIn: 'root',
})
export class ToolService {

    private toolCategories: ToolCategory[];
    private toolCategoryIndex: number;

    constructor(private bucketService: BucketService,
        private svgService: SVGService) {

        // TODO - Bucket is the default tool, this is probably not
        // what we want.
        this.svgService.tool = this.bucketService;

        const pencil: Pencil = new Pencil();
        const brush: Brush = new Brush();
        const rectangle: Rectangle = new Rectangle();
        const drawingTools: ToolCategory = new ToolCategory([
            pencil,
            brush,
            rectangle,
        ]);

        const navigationHand: NavigationHand = new NavigationHand();
        const navigationHandCategory: ToolCategory = new ToolCategory([
            navigationHand,
        ]);

        this.toolCategories = [drawingTools, navigationHandCategory];
        this.toolCategoryIndex = 0;
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
