import { Injectable } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { GridType, ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class GridTool implements ITool {

    gridType: GridType;
    constructor(public grid: GridService) { }

    onPressed(event: MouseEvent): null {
        return null;
    }

    onReleased(event: MouseEvent): void {
        return;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
}
