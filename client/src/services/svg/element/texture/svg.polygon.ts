import { Renderer2, Pipe } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { PolygonType, TraceType } from 'src/services/tool/tool-options/i-shape-tool';

const THIRTY_DEGREES = (Math.PI) / 6;
const FORTY_DEGREES = ((Math.PI) * 2) / 9;
const FORTY_FIVE_DEGREES = (Math.PI) / 4;
const FIFTY_ONE_DEGREES = ((Math.PI) * 2) / 7;
const SIXTY_DEGREES = (Math.PI) / 3;
const SEVENTY_TWO_DEGREES = ((Math.PI) * 2) / 5;
const EIGHTY_DEGREES = (Math.PI) / 9;
const NINETY_DEGREES = (Math.PI) / 2;
const ONE_HUNDRED_THREE_DEGREES = ((Math.PI) * 4) / 7;
const ONE_HUNDRED_FIFTY_FOUR_DEGREES = ((Math.PI) * 6) / 7;
const ONE_HUNDRED_TWENTY_DEGREES = ((Math.PI) * 2) / 3;
const ONE_HUNDRED_THIRTY_FIVE_DEGREES = ((Math.PI) * 3) / 4;
const ONE_HUNDRED_FORTY_FOUR_DEGREES = ((Math.PI) * 4) / 5;
const ONE_HUNDRED_EIGHTY_DEGREES = (Math.PI);
const TWO_HUNDRED_SIX_DEGREES = ((Math.PI) * 8) / 7;
const TWO_HUNDRED_TWENTY_FIVE_DEGREES = ((Math.PI) * 5) / 4;
const TWO_HUNDRED_FORTY_DEGREES = ((Math.PI) * 4) / 4;
const TWO_HUNDRED_SIXTEEN_DEGREES = ((Math.PI) * 6) / 5;
const TWO_HUNDRED_FIFTY_SEVEN_DEGREES = ((Math.PI) * 10) / 7;
const TWO_HUNDRED_SEVENTY_DEGREES = ((Math.PI) * 3) / 2;
const TWO_HUNDRED_EIGHTY_EIGHT_DEGREES = ((Math.PI) * 8) / 5;
const THREE_HUNDRED_DEGREES = ((Math.PI) * 5) / 3;
const THREE_HUNDRED_FIFTEEN_DEGREES = ((Math.PI) * 7) / 4;
const THREE_HUNDRED_EIGHT_DEGREES = ((Math.PI) * 12) / 7;
const THREE_HUNDRED_SIXTY_DEGREES = (Math.PI) * 2;

export class SVGPolygon implements SVGInterface {
    element: any;

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    pointSize = 1;
    stroke = true;
    fill = true;

    point1X: number;
    point2X: number;
    point3X: number;
    point4X: number;
    point5X: number;
    point6X: number;
    point7X: number;
    point8X: number;
    point9X: number;
    point10X: number;
    point11X: number;
    point12X: number;

    point1Y: number;
    point2Y: number;
    point3Y: number;
    point4Y: number;
    point5Y: number;
    point6Y: number;
    point7Y: number;
    point8Y: number;
    point9Y: number;
    point10Y: number;
    point11Y: number;
    point12Y: number;

    lenght: number;
    height: number;

    constructor(x: number, y: number, private renderer: Renderer2) {
        this.element = this.renderer.createElement('polygon', 'svg');
        this.x1 = this.x2 = x;
        this.y1 = this.y2 = y;
        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'x', `${this.x1}`);
        this.renderer.setAttribute(this.element, 'y', `${this.y1}`);
    }

    isAt(x: number, y: number): boolean {
        // Find maximum and minimum values
        const minX: number = Math.min(this.x1, this.x2);
        const maxX: number = Math.max(this.x1, this.x2);
        const minY: number = Math.min(this.y1, this.y2);
        const maxY: number = Math.max(this.y1, this.y2);
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
    }

    isIn(x: number, y: number, r: number): boolean {
        return true;
    }

    setPrimary(color: string): void {
        if (this.fill) {
            this.renderer.setAttribute(this.element, 'fill', color);
        }

    }
    setSecondary(color: string): void {
        if (this.stroke) {
            this.renderer.setAttribute(this.element, 'stroke', color);
        }
    }

    setPointSize(pointSize: number): void {
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'stroke-width', this.pointSize.toString());
    }

    setTraceType(traceType: TraceType): void {
        switch (traceType) {
            case TraceType.BorderOnly:
                this.fill = false;
                this.stroke = true;
                this.renderer.setAttribute(this.element, 'fill-opacity', '0');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '1');
                break;
            case TraceType.FillOnly:
                this.fill = true;
                this.stroke = false;
                this.renderer.setAttribute(this.element, 'fill-opacity', '1');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '0');
                break;
            case TraceType.FillAndBorder:
                this.fill = true;
                this.stroke = true;
                this.renderer.setAttribute(this.element, 'fill-opacity', '1');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '1');
                break;
        }
    }

    setCursor(x: number, y: number, polygonType: PolygonType) {
        this.x2 = x;
        this.y2 = y;

        let angleAdvancement: number;
        const radius = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        if (this.x1 === this.x2) {
            angleAdvancement = Math.asin((this.y2 - this.y1) / radius);
        } else if (this.y1 === this.y2) {
            angleAdvancement = Math.asin((this.x2 - this.x1) / radius);
        } else {
            angleAdvancement = Math.asin((this.x2 - this.x1) / radius);
        }

        switch (polygonType) {
            case PolygonType.Triangle:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_TWENTY_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_TWENTY_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_FORTY_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_FORTY_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}`);
                break;
            case PolygonType.Square:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + NINETY_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + NINETY_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}`);
                break;
            case PolygonType.Pentagon:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + SEVENTY_TWO_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + SEVENTY_TWO_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_FORTY_FOUR_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_FORTY_FOUR_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_SIXTEEN_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_SIXTEEN_DEGREES);

                this.point5X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_EIGHTY_EIGHT_DEGREES);
                this.point5Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_EIGHTY_EIGHT_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}`);
                break;
            case PolygonType.Hexagon:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + SIXTY_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + SIXTY_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_TWENTY_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_TWENTY_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);

                this.point5X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_FORTY_DEGREES);
                this.point5Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_FORTY_DEGREES);

                this.point6X = this.x2 + radius * Math.cos(angleAdvancement + THREE_HUNDRED_DEGREES);
                this.point6Y = this.y2 + radius * Math.sin(angleAdvancement + THREE_HUNDRED_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}`);
                break;
            case PolygonType.Heptagon:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + FIFTY_ONE_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + FIFTY_ONE_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_THREE_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_THREE_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_FIFTY_FOUR_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_FIFTY_FOUR_DEGREES);

                this.point5X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_SIX_DEGREES);
                this.point5Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_SIX_DEGREES);

                this.point6X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_FIFTY_SEVEN_DEGREES);
                this.point6Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_FIFTY_SEVEN_DEGREES);

                this.point7X = this.x2 + radius * Math.cos(angleAdvancement + THREE_HUNDRED_EIGHT_DEGREES);
                this.point7Y = this.y2 + radius * Math.sin(angleAdvancement + THREE_HUNDRED_EIGHT_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}`);
                break;
            case PolygonType.Octagon:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + FORTY_FIVE_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + FORTY_FIVE_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + NINETY_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + NINETY_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_THIRTY_FIVE_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_THIRTY_FIVE_DEGREES);

                this.point5X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);
                this.point5Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);

                this.point6X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_TWENTY_FIVE_DEGREES);
                this.point6Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_TWENTY_FIVE_DEGREES);

                this.point7X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);
                this.point7Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);

                this.point8X = this.x2 + radius * Math.cos(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);
                this.point8Y = this.y2 + radius * Math.sin(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}
                                                            ${this.point8X},${this.point8Y}`);
                break;
            case PolygonType.Nonagon:
                //
                this.point1X = this.x2;
                this.point1Y = this.y2;

                this.point2X = this.x2 + radius * Math.cos(angleAdvancement + FORTY_FIVE_DEGREES);
                this.point2Y = this.y2 + radius * Math.sin(angleAdvancement + FORTY_FIVE_DEGREES);

                this.point3X = this.x2 + radius * Math.cos(angleAdvancement + NINETY_DEGREES);
                this.point3Y = this.y2 + radius * Math.sin(angleAdvancement + NINETY_DEGREES);

                this.point4X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_THIRTY_FIVE_DEGREES);
                this.point4Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_THIRTY_FIVE_DEGREES);

                this.point5X = this.x2 + radius * Math.cos(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);
                this.point5Y = this.y2 + radius * Math.sin(angleAdvancement + ONE_HUNDRED_EIGHTY_DEGREES);

                this.point6X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_TWENTY_FIVE_DEGREES);
                this.point6Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_TWENTY_FIVE_DEGREES);

                this.point7X = this.x2 + radius * Math.cos(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);
                this.point7Y = this.y2 + radius * Math.sin(angleAdvancement + TWO_HUNDRED_SEVENTY_DEGREES);

                this.point8X = this.x2 + radius * Math.cos(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);
                this.point8Y = this.y2 + radius * Math.sin(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);

                this.point9X = this.x2 + radius * Math.cos(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);
                this.point9Y = this.y2 + radius * Math.sin(angleAdvancement + THREE_HUNDRED_FIFTEEN_DEGREES);

                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}
                                                            ${this.point8X},${this.point8Y}
                                                            ${this.point9X},${this.point9Y}`);
                break;
            case PolygonType.Decagon:
                //
                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}
                                                            ${this.point8X},${this.point8Y}
                                                            ${this.point9X},${this.point9Y}
                                                            ${this.point10X},${this.point10Y}`);
                break;
            case PolygonType.Hendecagon:
                //
                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}
                                                            ${this.point8X},${this.point8Y}
                                                            ${this.point9X},${this.point9Y}
                                                            ${this.point10X},${this.point10Y}
                                                            ${this.point11X},${this.point11Y}`);
                break;
            case PolygonType.Dodecagon:
                //
                this.renderer.setAttribute(this.element, 'points', `${this.point1X},${this.point1Y}
                                                            ${this.point2X},${this.point2Y}
                                                            ${this.point3X},${this.point3Y}
                                                            ${this.point4X},${this.point4Y}
                                                            ${this.point5X},${this.point5Y}
                                                            ${this.point6X},${this.point6Y}
                                                            ${this.point7X},${this.point7Y}
                                                            ${this.point8X},${this.point8Y}
                                                            ${this.point9X},${this.point9Y}
                                                            ${this.point10X},${this.point10Y}
                                                            ${this.point11X},${this.point11Y}
                                                            ${this.point12X},${this.point12Y}`);
                break;
            default:
                break;
        }
    }
}
