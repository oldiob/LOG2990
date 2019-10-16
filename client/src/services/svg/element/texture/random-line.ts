import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';

export class RandomLineTexture implements ITexture {
    allLines: any[];
    offsetX: number[];
    offsetY: number[];

    create(brush: SVGBrush): void {
        this.allLines = [];
        this.offsetX = [];
        this.offsetY = [];

        brush.element = brush.renderer.createElement('g', 'svg');

        for (let i = 0; i < 5; i++) {
          const line = brush.renderer.createElement('polyline', 'svg');

          this.allLines.push(line);
          this.offsetX.push(this.getRandom(brush.lineWidth * 4));
          this.offsetY.push(this.getRandom(brush.lineWidth * 4));

          brush.renderer.appendChild(brush.element, line);
          brush.renderer.setAttribute(line, 'fill', 'none');
          brush.renderer.setAttribute(line, 'stroke-linecap', 'round');
          brush.renderer.setAttribute(line, 'stroke-linejoin', 'round');

          brush.renderer.setAttribute(line, 'stroke-width', brush.lineWidth.toString());
        }
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        for (let i = 0; i < this.allLines.length; i++) {
          brush.points.pop();
          brush.points.push([x + this.offsetX[i], y + this.offsetY[i]]);
          console.log(i , brush.pointsAttribute());
          brush.renderer.setAttribute(this.allLines[i], 'points', brush.pointsAttribute());
        }
    }
    getRandom(max: number): number {
      return Math.floor(Math.random() * max);
    }
}
