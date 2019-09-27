import { SVGInterface } from 'src/services/svg/element/svg.interface'
import { ITool } from './i-tool';

export class Brush implements ITool {
  width: number;
  element: SVGInterface | null;
  readonly FILENAME = 'brush.png';

  constructor() {
    this.width = 1;
  }

  onPressed(x: number, y: number): void {
    throw new Error('Method not implemented.');
  }
  onMotion(x: number, y: number): void {
    throw new Error('Method not implemented.');
  }
  onReleased(x: number, y: number): void {
    throw new Error('Method not implemented.');
  }

  leftClick() {
    throw new Error('Method not implemented.');
  }
  leftRelease() {
    throw new Error('Method not implemented.');
  }

}
