import { Injectable, Renderer2 } from '@angular/core';
import { Brush } from './tool-options/brush';
import { Bucket } from './tool-options/bucket';
import { Pencil } from './tool-options/pencil';
import { Rectangle } from './tool-options/rectangle';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './tool-options/i-tool';
import { RendererProviderService } from '../renderer-provider/renderer-provider.service';

/**
 * ToolService is used to access the current tool and to change tools ONLY.
 */
@Injectable({
    providedIn: 'root',
})
export class ToolService {

    currentTool: ITool;

    constructor() {
        //
    }
}
