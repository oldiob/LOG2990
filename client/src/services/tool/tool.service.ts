import { Injectable, Renderer2 } from '@angular/core';
import { Brush } from './tool-options/brush';
import { Bucket } from './tool-options/bucket';
import { Pencil } from './tool-options/pencil';
import { Rectangle } from './tool-options/rectangle';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolCategory } from './tool-category';
import { ITool } from './tool-options/i-tool';
import { RendererProviderService } from '../renderer-provider/renderer-provider.service';

/**
 * ToolService is used to access the current tool and to change tools ONLY.
 */
@Injectable({
    providedIn: 'root',
})
export class ToolService {

    private toolCategories: ToolCategory[];
    private toolCategoryIndex: number;
    currentTool: ITool;

    constructor(rendererProvider: RendererProviderService, svgService: SVGService) {
        const renderer: Renderer2 = rendererProvider.renderer;

        const pencil: Pencil = new Pencil(renderer);
        const brush: Brush = new Brush(renderer);
        const bucket: Bucket = new Bucket(svgService);
        const rectangle: Rectangle = new Rectangle(renderer);
        const drawingTools: ToolCategory = new ToolCategory([
            pencil,
            brush,
            bucket,
            rectangle,
        ]);

        this.toolCategories = [drawingTools];
        this.setToolCategoryIndex(0);
    }

    getToolCategoryFilename(categoryIndex: number): string {
        const currentIndex: number = this.toolCategoryIndex;
        this.setToolCategoryIndex(categoryIndex);
        const filename: string = this.getCurrentTool().FILENAME;
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
        this.currentTool = this.toolCategories[this.toolCategoryIndex].currentTool;
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
