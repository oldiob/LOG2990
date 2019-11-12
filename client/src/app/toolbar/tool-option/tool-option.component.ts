import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmojiStamp } from 'src/services/svg/element/stamp/emoji';
import { Base64, IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { BlurTexture } from 'src/services/svg/element/texture/blur';
import { CircleTexture } from 'src/services/svg/element/texture/circle';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { OpacityTexture } from 'src/services/svg/element/texture/opacity';
import { RandomRectTexture } from 'src/services/svg/element/texture/random-rect';
import { TurbulenceTexture } from 'src/services/svg/element/texture/turbulence';
import { BrushTool } from 'src/services/tool/tool-options/brush';
import { EraserTool } from 'src/services/tool/tool-options/eraser';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool, JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { LineTool } from 'src/services/tool/tool-options/line';
import { PenTool } from 'src/services/tool/tool-options/pen';
import { PencilTool } from 'src/services/tool/tool-options/pencil';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { AngleComponent } from '../subcomponent/angle/angle.component';
import { JunctionComponent } from '../junction-width/junction-width.component';
import { ShowcaseComponent } from '../subcomponent/showcase/showcase.component';
import { WidthComponent } from '../subcomponent/width/width.component';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

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
    MAX_WIDTH = 25;
    MIN_WIDTH = 0.5;
    LineType = LineType;
    JunctionType = JunctionType;
    Base64 = Base64;

    tip = 'Tools';
    images = new Map<ITool, string>([
        [this.pencil, 'pencil.png'],
        [this.brush, 'brush.png'],
        [this.line, 'line.png'],
        [this.stamp, 'stamp.png'],
        [this.pen, 'pen.png'],
        [this.eraser, 'eraser.png'],
    ]);

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    @ViewChild(WidthComponent, { static: true })
    widthComponent: WidthComponent;

    @ViewChild(AngleComponent, { static: true })
    angleComponent: AngleComponent;

    @ViewChild(JunctionComponent, { static: true })
    junctionComponent: JunctionComponent;

    textures: ITexture[];
    currentTexture: ITexture;

    tools: ITool[];
    currentTool: ITool;

    stamps: IStamp[];
    currentStamp: IStamp;

    imageStamp: any[];
    imageEmojis: string[];
    imagePaths: string[];

    lineForm: FormGroup;
    junctionForm: FormGroup;

    constructor(
        private toolService: ToolService,
        private formBuilder: FormBuilder,
        private pencil: PencilTool,
        private brush: BrushTool,
        private line: LineTool,
        private stamp: StampTool,
        private pen: PenTool,
        private eraser: EraserTool) {
        this.textures = [new BlurTexture(), new OpacityTexture(), new CircleTexture(), new TurbulenceTexture(), new RandomRectTexture()];
        this.stamps = [new EmojiStamp()];

        this.imageStamp = [] = [
            { png: './assets/images/emojis/angel.png', base64: Base64.ANGEL },
            { png: './assets/images/emojis/angry.png', base64: Base64.ANGRY },
            { png: './assets/images/emojis/cool-1.png', base64: Base64.COOL },
            { png: './assets/images/emojis/crying-1.png', base64: Base64.CRY },
            { png: './assets/images/emojis/kiss-1.png', base64: Base64.KISS },
            { png: './assets/images/emojis/laughing-1.png', base64: Base64.LAUGH },
            { png: './assets/images/emojis/shocked.png', base64: Base64.SHOCKED },
            { png: './assets/images/emojis/sick.png', base64: Base64.SICK },
        ];

        this.currentStamp = this.stamps[0];
        this.stamp.currentPath = this.imageStamp[0].base64;
        this.stamp.stampTexture = this.currentStamp;

        this.currentTexture = this.textures[0];
        this.brush.texture = this.currentTexture;

        this.tools = [this.pencil, this.brush, this.line, this.stamp, this.pen, this.eraser];
        this.currentTool = this.tools[0];
    }

    ngOnInit(): void {
        this.createJunctionForm();
        this.createLineForm();
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
        ShowcaseSignal.emit();
    }

    selectTexture(texture: ITexture): void {
        this.currentTexture = texture;
        this.brush.texture = this.currentTexture;

        ShowcaseSignal.emit();
    }

    selectStamp(image: string): void {
        this.stamp.currentPath = image;
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

    setJunctionWidth(width: number): void {
        if (this.currentTool instanceof LineTool) {
            this.currentTool.junctionWidth = width;
            ShowcaseSignal.emit();

        }
    }

    setAngle(angle: number): void {
        // dumbass temporary solution
        if (this.currentTool instanceof StampTool) {
            this.currentTool.angle = angle;
            ShowcaseSignal.emit();

        }
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    onLineTypeChange(): void {
        if (this.currentTool instanceof LineTool) {
            this.currentTool.lineType = this.lineForm.controls.lineType.value;
            ShowcaseSignal.emit();

        }
    }

    onJunctionTypeChange(): void {
        if (this.currentTool instanceof LineTool) {
            this.currentTool.junctionType = this.junctionForm.controls.junctionType.value;
            ShowcaseSignal.emit();

        }
    }

    private createLineForm(): void {
        const DEFAULT_LINE_TYPE = LineType.FullLine;
        const validators = [Validators.min(0), Validators.required];

        this.lineForm = this.formBuilder.group({
            lineType: [DEFAULT_LINE_TYPE, validators],
        });
    }

    private createJunctionForm(): void {
        const DEFAULT_JUNCTION_TYPE = JunctionType.Angle;
        const validators = [Validators.min(0), Validators.required];

        this.junctionForm = this.formBuilder.group({
            junctionType: [DEFAULT_JUNCTION_TYPE, validators],
        });
    }
}
