import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

    @Output() color = new EventEmitter<Color>();

    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('wrapper', { static: true })
    wrapper: ElementRef<HTMLCanvasElement>;

    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private mouseX: number;
    private mouseY: number;
    private picker: any;
    pickedColor: string;

    constructor() {
        //
    }

    ngOnInit() {
        this.canvasElement = this.canvas.nativeElement as HTMLCanvasElement;
        this.context = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;

        this.canvasElement.width = this.wrapper.nativeElement.clientWidth;
        this.canvasElement.height = this.wrapper.nativeElement.clientHeight;

        this.makeColorPallette();
        this.createPickerIcon();
        this.listenToColor();
    }

    createPickerIcon() {
        this.picker = DOMRenderer.createElement('div');
        DOMRenderer.appendChild(this.wrapper.nativeElement, this.picker);
        DOMRenderer.setStyle(this.picker, 'position', 'absolute');
        DOMRenderer.setStyle(this.picker, 'width', '20px');
        DOMRenderer.setStyle(this.picker, 'height', '20px');
        DOMRenderer.setStyle(this.picker, 'border', '2px solid white');
        DOMRenderer.setStyle(this.picker, 'border-radius', '100%');
        DOMRenderer.setStyle(this.picker, 'opacity', '0');
    }

    private listenToColor() {
        const mouseUp = fromEvent(document, 'mouseup');
        const mouseDown = fromEvent(this.canvasElement, 'mousedown');
        const mouseMove = fromEvent(this.canvasElement, 'mousemove');

        mouseDown.pipe(
            mergeMap((event: MouseEvent) => {
                this.pickColor(event);
                return mouseMove.pipe(takeUntil(mouseUp));
            }))
            .subscribe((event: MouseEvent) => {
                this.pickColor(event);
            });
    }

    pickColor(event: MouseEvent) {
        this.updateMousePosition(event);
        this.getColor();
        this.updatePickerStyle(event);
    }

    private updateMousePosition(event: MouseEvent) {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }

    private updatePickerStyle(event: MouseEvent) {
        const rect = this.canvasElement.getBoundingClientRect();
        const dotX = event.clientX - rect.left;
        const dotY = event.clientY - rect.top;

        DOMRenderer.setStyle(this.picker, 'opacity', '1');
        DOMRenderer.setStyle(this.picker, 'pointer-events', 'none');
        DOMRenderer.setStyle(this.picker, 'left', dotX - 10 + 'px');
        DOMRenderer.setStyle(this.picker, 'top', dotY + 10 + 'px');
        DOMRenderer.setStyle(this.picker, 'background-color', this.pickedColor.toString());
    }

    private makeColorPallette() {
        this.applyHorizontalGradient();
        this.applyVerticalGradient();
    }

    private applyHorizontalGradient() {
        const gradient = this.context.createLinearGradient(0, 0, this.canvasElement.width, 0);

        const offsets = [0, 0.17, 0.33, 0.50, 0.67, 0.83, 1];
        const colors = ['red', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'red'];

        for (let index = 0; index < offsets.length; index++) {
            gradient.addColorStop(offsets[index], colors[index]);
        }

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    private applyVerticalGradient() {
        const gradient = this.context.createLinearGradient(0, 0, 0, this.canvasElement.height);

        const offsets = [0, 0.5, 0.5, 1];
        const transparencies = [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 1)',
        ];

        for (let index = 0; index < offsets.length; index++) {
            gradient.addColorStop(offsets[index], transparencies[index]);
        }

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    private getColor() {
        const pixel = this.context.getImageData(this.mouseX, this.mouseY, 1, 1);

        const color: Color = new Color(
            pixel.data[0],
            pixel.data[1],
            pixel.data[2],
            (pixel.data[3] / 255));

        this.pickedColor = color.toRGBA();
        this.color.emit(color);
    }
}
