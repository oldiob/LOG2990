import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngleComponent } from 'src/app/angle/angle.component';
import { PaletteService } from 'src/services/palette/palette.service';
import { EmojiStamp } from 'src/services/svg/element/stamp/emoji';
import { IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { BlurTexture } from 'src/services/svg/element/texture/blur';
import { CircleTexture } from 'src/services/svg/element/texture/circle';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { RandomCircleTexture } from 'src/services/svg/element/texture/random-circle';
import { RandomRectTexture } from 'src/services/svg/element/texture/random-rect';
import { RectTexture } from 'src/services/svg/element/texture/rect';
import { BrushTool } from 'src/services/tool/tool-options/brush';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { LineTool } from 'src/services/tool/tool-options/line';
import { PencilTool } from 'src/services/tool/tool-options/pencil';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { WidthComponent } from '../width/width.component';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    MIN_ANGLE = 0;
    MAX_ANGLE = 360;
    MULTI_15 = 15;

    images = new Map<ITool, string>([
        [this.pencil, 'pencil.png'],
        [this.brush, 'brush.png'],
        [this.line, 'line.png'],
        [this.stamp, 'stamp.png'],
    ]);

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    @ViewChild(WidthComponent, { static: true })
    widthComponent: WidthComponent;

    @ViewChild(AngleComponent, { static: true })
    angleComponent: AngleComponent;

    textures: ITexture[];
    currentTexture: ITexture;

    tools: ITool[];
    currentTool: ITool;

    stamps: IStamp[];
    currentStamp: IStamp;

    isShowPrimary: boolean;
    isShowSecondary: boolean;

    imagePaths: string[];
    currentPath: string;

    degres: number;

    constructor(private paletteService: PaletteService, private toolService: ToolService, public pencil: PencilTool,
                public brush: BrushTool, public line: LineTool, public stamp: StampTool) {
        this.textures = [new BlurTexture(), new CircleTexture(), new RectTexture(), new RandomCircleTexture(), new RandomRectTexture()];
        this.stamps = [new EmojiStamp()];
        this.imagePaths = ['./assets/images/quiet.png', './assets/images/love.png', './assets/images/kiss.png',
                           './assets/images/bec.png', './assets/images/shade.png'];
        this.currentPath = '';
        this.currentStamp = this.stamps[0];
        this.stamp.stampTexture = this.currentStamp;
        this.currentTexture = this.textures[0];
        this.brush.texture = this.currentTexture;

        this.tools = [pencil, brush, line, stamp];
        this.currentTool = this.tools[0];
        this.degres = 1;
    }

    ngOnInit(): void {
        this.isShowPrimary = false;
        this.isShowSecondary = false;
        this.showcase.display(this.currentTool);
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
        this.showcase.display(this.currentTool);
    }

    selectTexture(texture: ITexture): void {
        this.currentTexture = texture;
        this.brush.texture = this.currentTexture;

        this.showcase.display(this.currentTool);
    }

    selectStamp(image: string): void {
        this.currentPath = image;
        this.stamp.currentPath = this.currentPath;
        this.showcase.display(this.currentTool);
    }

    setWidth(width: number): void {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            this.showcase.display(this.currentTool);
        }
    }

    setAngle(angle: number): void {
        if (this.currentTool.angle !== null) {
            this.currentTool.angle = angle;
            this.showcase.display(this.currentTool);
        }
    }

    @HostListener('document: wheel', ['$event'])
    onWheel(event: WheelEvent): void {
        const changeAngle = event.altKey ? this.degres : this.degres * this.MULTI_15;
        if (this.currentTool.angle !== null) {
            if (event.deltaY < this.MIN_ANGLE && this.currentTool.angle - changeAngle >= this.MIN_ANGLE) {
                this.currentTool.angle -= changeAngle;
            } else if (event.deltaY > this.MIN_ANGLE && this.currentTool.angle + changeAngle <= this.MAX_ANGLE) {
                this.currentTool.angle += changeAngle;
            }
        }
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    togglePrimaryColorPicker(): void {
        this.isShowSecondary = false;
        this.isShowPrimary = !this.isShowPrimary;
    }

    toggleSecondaryColorPicker(): void {
        this.isShowPrimary = false;
        this.isShowSecondary = !this.isShowSecondary;
    }

    onSwap(): void {
        this.paletteService.swap();
        this.setPrimaryColor();
        this.setSecondary();
    }

    onColorPick(): void {
        this.isShowPrimary ? this.setPrimaryColor() : this.setSecondary();
        this.hideColorPicker();
    }

    hideColorPicker(): void {
        this.isShowPrimary ? this.isShowPrimary = false
            : this.isShowSecondary = false;
    }

    private setPrimaryColor() {
        return {
            'background-color': this.paletteService.getPrimary(),
        };
    }

    private setSecondary() {
        return {
            'background-color': this.paletteService.getSecondary(),
        };
    }
}
