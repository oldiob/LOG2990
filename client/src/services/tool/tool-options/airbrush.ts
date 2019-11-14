import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { ITool } from './i-tool';

export class TextTool implements ITool {
  tip: string;
  width?: number | undefined;

  element: SVGAirbrush | null = null;

  constructor() {
      const DEFAULT_WIDTH = 15;
      this.width = DEFAULT_WIDTH;
  }
  onPressed(event: MouseEvent): CmdSVG | null {
    this.element = new SVGAirbrush(event.svgX, event.svgY);

    return new CmdSVG(this.element);
  }
  onMotion(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  onReleased(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

}
