import { ITool } from './i-tool';

export class Pencil implements ITool {
  FILENAME: string = "pencil.png";
  
  constructor() { //
  }

  onPressed(event: MouseEvent): import('../../svg/svg.interface').SVGInterface | null {
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
