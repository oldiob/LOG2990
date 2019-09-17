import { Injectable } from '@angular/core';
import { ToolCategory } from './tool-category';
import { Pencil } from './tool-options/pencil';
import { Brush } from './tool-options/brush';
import { Rectangle } from './tool-options/rectangle';

@Injectable({
    providedIn: 'root',
})
export class CurrentToolService {

    toolCategories: ToolCategory[];

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
    }

}
