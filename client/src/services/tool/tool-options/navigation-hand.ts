import { ITool } from './i-tool';

/**
 * Tool used to move the work-zone around
 */
export class NavigationHand implements ITool {
  FILENAME: string = "hand.png";

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
