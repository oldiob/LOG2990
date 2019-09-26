import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { takeUntil, skipUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  mouseX: number;
  mouseY: number;
  pickedColor: string;

  mouseUp: Observable<Event>;
  mouseDown: Observable<Event>;

  // to be removed
  debug: string;

  constructor() {
    //
  }

  ngOnInit() {
    this.canvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    this.context = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;

    this.makeColorPallette();
    this.listenToColor();
  }

  private listenToColor() {
    this.mouseUp = fromEvent(this.canvasElement, 'mouseup');
    this.mouseDown = fromEvent(this.canvasElement, 'mousedown');

    this.mouseDown.pipe(
      mergeMap(() => {
        const mouseMove = fromEvent(this.canvasElement, 'mousemove');
        return mouseMove.pipe(takeUntil(this.mouseUp));
      }))
      .subscribe((event: MouseEvent) => {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
        this.getColor();
      });
  }

  private makeColorPallette() {
    this.applyHorizontalGradient();
    this.applyVerticalGradient();
  }

  private applyHorizontalGradient() {
    const gradient = this.context.createLinearGradient(0, 0, this.canvasElement.width, 0);

    // offsets to be tested
    const offsets = [0, 0.15, 0.33, 0.49, 0.67, 0.84, 1];
    const colors = ['red', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'red'];

    for (let index = 0; index < offsets.length; index++) {
      gradient.addColorStop(offsets[index], colors[index]);
    }

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvas.nativeElement.height);
  }

  private applyVerticalGradient() {
    const gradient = this.context.createLinearGradient(0, 0, 0, this.canvasElement.height);

    // offsets to be tested
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
    this.context.fillRect(0, 0, this.canvasElement.width, this.canvas.nativeElement.height);
  }

  private getColor() {
    const pixel = this.context.getImageData(this.mouseX, this.mouseY, 1, 1);
    this.pickedColor = 'rgba(' + pixel.data[0] + ', ' + pixel.data[1] +
      ', ' + pixel.data[2] + ', ' + (pixel.data[3] / 255) + ')';

    this.debug = this.pickedColor;
  }
}
