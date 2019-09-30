import { Component, OnInit, ViewChild } from '@angular/core';
import { BlurTexture } from 'src/services/svg/element/texture/blur';
import { CircleTexture } from 'src/services/svg/element/texture/circle';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { RectTexture } from 'src/services/svg/element/texture/rect';
import { BrushTool } from 'src/services/tool/tool-options/brush';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { PencilTool } from 'src/services/tool/tool-options/pencil';
import { ToolService } from 'src/services/tool/tool.service';
import { WidthComponent } from '../width/width.component';
import { Circle2Texture } from 'src/services/svg/element/texture/circle2';
import { Rect2Texture } from 'src/services/svg/element/texture/rect2';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    @ViewChild(ShowcaseComponent, {static: true})
    showcase: ShowcaseComponent;

    @ViewChild(WidthComponent, {static: true})
    widthComponent: WidthComponent;

    textures: ITexture[];
    currentTexture: ITexture;

    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, pencil: PencilTool, public brush: BrushTool) {
        this.textures = [new BlurTexture(), new CircleTexture(), new RectTexture(), new Circle2Texture(), new Rect2Texture()];
        this.currentTexture = this.textures[0];
        this.brush.texture = this.currentTexture;

        this.tools = [ pencil, brush];
        this.currentTool = this.tools[0];
    }

    ngOnInit() {
        this.showcase.display(this.currentTool);
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
        this.showcase.display(this.currentTool);
    }

    selectTexture(texture: ITexture): void {
        this.currentTexture = texture;
        this.brush.texture = this.currentTexture;

        this.showcase.display(this.currentTool);
    }

    setWidth(width: number) {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            this.showcase.display(this.currentTool);
        }
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + tool.BUTTON_FILENAME;
    }
}
