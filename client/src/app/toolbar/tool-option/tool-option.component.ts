import { Component, OnInit } from '@angular/core';
import { EmojiStamp } from 'src/services/svg/element/stamp/emoji';
import { BlurTexture } from 'src/services/svg/element/texture/blur';
import { CircleTexture } from 'src/services/svg/element/texture/circle';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { OpacityTexture } from 'src/services/svg/element/texture/opacity';
import { RandomRectTexture } from 'src/services/svg/element/texture/random-rect';
import { TurbulenceTexture } from 'src/services/svg/element/texture/turbulence';
import { AirbrushTool } from 'src/services/tool/tool-options/airbrush';
import { BrushTool } from 'src/services/tool/tool-options/brush';
import { EraserTool } from 'src/services/tool/tool-options/eraser';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { LineTool } from 'src/services/tool/tool-options/line';
import { PenTool } from 'src/services/tool/tool-options/pen';
import { PencilTool } from 'src/services/tool/tool-options/pencil';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    MAX_WIDTH = 25;
    MIN_WIDTH = 0.5;

    tip = 'Tools';
    images = new Map<ITool, string>([
        [this.pencil, 'pencil.png'],
        [this.brush, 'brush.png'],
        [this.line, 'line.png'],
        [this.stamp, 'stamp.png'],
        [this.pen, 'pen.png'],
        [this.eraser, 'eraser.png'],
        [this.airbrush, 'airbrush.png'],
    ]);

    textures: ITexture[];
    currentTexture: ITexture;

    tools: ITool[];
    currentTool: ITool;

    constructor(
        private toolService: ToolService,
        public airbrush: AirbrushTool,
        public pencil: PencilTool,
        public brush: BrushTool,
        public line: LineTool,
        public stamp: StampTool,
        public pen: PenTool,
        public eraser: EraserTool) {
        this.textures = [new BlurTexture(), new OpacityTexture(), new CircleTexture(), new TurbulenceTexture(), new RandomRectTexture()];

        stamp.stampTexture = new EmojiStamp();

        this.currentTexture = this.textures[0];
        this.brush.texture = this.currentTexture;

        this.tools = [this.pencil, this.brush, this.line, this.stamp, this.pen, this.eraser, this.airbrush];
        this.selectTool(this.tools[0]);
    }

    ngOnInit(): void {
        ShowcaseSignal.emit();
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
    }

    selectTexture(texture: ITexture): void {
        this.currentTexture = texture;
        this.brush.texture = this.currentTexture;

        ShowcaseSignal.emit();
    }

    setWidth(width: number): void {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            ShowcaseSignal.emit();
        }
    }

    setMaxWidth(maxWidth: number): void {
        if (this.currentTool instanceof PenTool) {
            if (maxWidth < this.currentTool.minWidth) {
                maxWidth++;
                if (maxWidth > this.MAX_WIDTH) {
                    maxWidth = this.MAX_WIDTH;
                }
            }
            this.currentTool.maxWidth = maxWidth;
            ShowcaseSignal.emit();
        }
    }

    setMinWidth(minWidth: number): void {
        if (this.currentTool instanceof PenTool) {
            if (minWidth > this.currentTool.maxWidth) {
                minWidth--;
                if (minWidth < this.MIN_WIDTH) {
                    minWidth = this.MIN_WIDTH;
                }
            }
            this.currentTool.minWidth = minWidth;
            ShowcaseSignal.emit();
        }
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

}
