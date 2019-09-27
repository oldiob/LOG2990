import { SVGInterface } from 'src/services/svg/element/svg.interface'
import { ITool } from './i-tool';

export class Brush implements ITool {
  element: SVGInterface | null;
  readonly FILENAME = 'brush.png';

  constructor() {
    //
  }

  onPressed(event: MouseEvent): SVGInterface | null {
    throw new Error('Method not implemented.');
  }
  onMotion(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  onReleased(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  leftClick() {
    throw new Error('Method not implemented.');
  }
  leftRelease() {
    throw new Error('Method not implemented.');
  }

}
