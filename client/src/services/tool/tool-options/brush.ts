import { ITool } from './i-tool';

export class Brush implements ITool {
  onPressed(event: MouseEvent): import('../../svg/svg.interface').SVGInterface | null {
    throw new Error('Method not implemented.');
  }
  onMotion(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  onReleased(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

    constructor() {
      //
     }

    leftClick() {
        throw new Error('Method not implemented.');
    }
    leftRelease() {
        throw new Error('Method not implemented.');
    }

}
