import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { ITool } from './i-tool';

export class TextTool implements ITool {
  tip: string;
  width?: number | undefined;

  readonly DEFAULT_RATE = 50;
  readonly DEFAULT_DIAMETER = 30;

  rate: number;
  diameter: number;

  element: SVGAirbrush | null = null;

  constructor() {
      const DEFAULT_WIDTH = 15;
      this.width = DEFAULT_WIDTH;
      this.rate = this.DEFAULT_RATE;
      this.diameter = this.DEFAULT_DIAMETER;
  }
  onPressed(event: MouseEvent): CmdSVG | null {
    this.element = new SVGAirbrush(event.svgX, event.svgY);
    this.element.spree(this.rate, this.diameter, event.svgX, event.svgY);

    return new CmdSVG(this.element);
  }
  onMotion(event: MouseEvent): void {
    if (this.element) {
      this.element.spree(this.rate, this.diameter, event.svgX, event.svgY);
    }
  }
  onReleased(event: MouseEvent): void {
    this.element = null;
  }

}
