import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class SVGText implements SVGInterface {
    EMPTYSTRING = '';
    ITALIC = 'italic';
    BOLD = 'bold';
    element: any;
    currentSubElement: any;
    previousSubElement: any;
    isLastSubElement: true;
    subElements: any = [];
    currentX: string;

    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    fontFamily: string;
    fontTextAlign: string;

    constructor(x: number, y: number, fontSize: string, fontStyle: string, fontWeight: string, fontFamily: string, textAlign: string) {
        this.element = DOMRenderer.createElement('text', 'svg');
        this.element.innerHTML = this.EMPTYSTRING;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.fontStyle = fontStyle;
        this.fontWeight = fontWeight;
        this.fontTextAlign = textAlign;
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());
        this.currentX = x.toString();

        this.currentSubElement = DOMRenderer.createElement('tspan', 'svg');
        DOMRenderer.setAttribute(this.currentSubElement, 'dy', '1em');
        DOMRenderer.setAttribute(this.currentSubElement, 'x', this.currentX);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);
        // this.currentSubElement.innerHTML = 'abs';
        // DOMRenderer.setAttribute(this.element, 'white-space', 'pre-wrap');
        // DOMRenderer.setAttribute(this.element, 'style', 'white-space: pre-wrap;');
    }
    isAt(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }
    isIn(x: number, y: number, r: number): boolean {
        throw new Error('Method not implemented.');
    }
    getPrimary(): string {
        throw new Error('Method not implemented.');
    }
    getSecondary(): string {
        throw new Error('Method not implemented.');
    }
    setPrimary(color: string): void {
        throw new Error('Method not implemented.');
    }
    setSecondary(color: string): void {
        throw new Error('Method not implemented.');
    }
    setFontSize(size: string): void {
        this.fontSize = size;
        DOMRenderer.setAttribute(this.element, 'font-size', this.fontSize);
    }
    setFontFamily(fontfamliy: string): void {
        this.fontFamily = fontfamliy;
        DOMRenderer.setAttribute(this.element, 'font-family', this.fontFamily);
    }
    setFontStyle(style: string): void {
        this.fontStyle = style;
        DOMRenderer.setAttribute(this.element, 'font-style', this.fontStyle);
    }
    setFontWeight(weight: string): void {
        this.fontWeight = weight;
        DOMRenderer.setAttribute(this.element, 'font-weight', this.fontWeight);
    }
    setTextAlign(align: string): void {
        this.fontTextAlign = align;
        DOMRenderer.setAttribute(this.element, 'text-align', this.fontTextAlign);
    }

    setLineBreak(): void {
        this.previousSubElement = this.currentSubElement;
        this.currentSubElement = DOMRenderer.createElement('tspan', 'svg');
        DOMRenderer.setAttribute(this.currentSubElement, 'x', this.currentX);
        DOMRenderer.setAttribute(this.currentSubElement, 'dy', '1em');
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', 'start');
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);

    }
}
