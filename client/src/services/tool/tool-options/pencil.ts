import { ITool } from './i-tool';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class Pencil implements ITool {
  FILENAME: string = "pencil.png";
  
  constructor() { //
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
