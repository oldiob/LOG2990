import { Injectable } from '@angular/core';
import { ITool } from './tool-options/i-tool';


@Injectable({
    providedIn: 'root',
})
export class ToolService {
    currentTool: ITool;
}
