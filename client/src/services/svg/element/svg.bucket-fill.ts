import { SVGAbstract } from './svg.interface';
import { BreadthFirst } from 'src/utils/breadth-first';
import { getImageData } from 'src/utils/misc';
import { Color } from 'src/utils/color';
import { vectorMinus } from 'src/utils/math';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class SVGBucketFill extends SVGAbstract {

    element: any;

    private canvas: HTMLCanvasElement;

    private position: number[];
    private size: number[];

    constructor(position: number[], color: Color, image: ImageData, tolerance: number) {
        super();

        const breadthFirst = new BreadthFirst(position, image, tolerance);
        let pixelPositions: number[][] = breadthFirst.positions;
        this.findDimensions(pixelPositions);
        this.normalizedPositions(pixelPositions);
        this.canvas = getImageData(pixelPositions, color, this.size[0], this.size[1]);

        this.element = DOMRenderer.createElement('image', 'svg');
        DOMRenderer.setAttribute(this.element, 'href', this.canvas.toDataURL());
        DOMRenderer.setAttribute(this.element, 'width', this.size[0].toString());
        DOMRenderer.setAttribute(this.element, 'height', this.size[1].toString());
        DOMRenderer.setAttribute(this.element, 'x', this.position[0].toString());
        DOMRenderer.setAttribute(this.element, 'y', this.position[1].toString());
    }

    private normalizedPositions(positions: number[][]): void {
        for (let i = 0; i < positions.length; i++) {
            positions[i] = vectorMinus(positions[i], this.position);
        }
    }

    private findDimensions(positions: number[][]) {
        const xRange = [Infinity, -Infinity];
        const yRange = [Infinity, -Infinity];

        positions.forEach((pos: number[]) => {
            if (pos[0] < xRange[0]) {
                xRange[0] = pos[0];
            }
            if (pos[0] > xRange[1]) {
                xRange[1] = pos[0];
            }
            if (pos[1] < yRange[0]) {
                yRange[0] = pos[1];
            }
            if (pos[1] > yRange[1]) {
                yRange[1] = pos[1];
            }
        });

        this.position = [xRange[0], yRange[0]];
        this.size = [xRange[1] - xRange[0] + 1, yRange[1] - yRange[0] + 1];
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        return;
    }
    setSecondary(color: string): void {
        return;
    }

    protected isAtAdjusted(x: number, y: number): boolean {
        return false;
    }
}
