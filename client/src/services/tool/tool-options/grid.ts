import { Injectable } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class GridTool implements ITool {
    constructor(public grid: GridService) { }

    onPressed(event: MouseEvent): null { return null; }
    onMotion(event: MouseEvent): void { }
    onReleased(event: MouseEvent): void { }
}
