import { KeyService } from 'src/services/key/key.service';
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
    fontTextAlign = 'left';

    constructor(keyService: KeyService, x: number, y: number,
                fontSize: string, fontStyle: string, fontWeight: string, fontFamily: string, textAlign: string) {
        keyService.setIsBlocking(true);
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
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', this.fontTextAlign);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);
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
        DOMRenderer.setAttribute(this.element, 'fill', color);
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
        for (const subElement of this.subElements) {
            DOMRenderer.setAttribute(subElement, 'text-anchor', align);
        }
    }
    setCurrentPlaceholder() {
        DOMRenderer.setAttribute(this.currentSubElement, 'opacity', '0');
        this.currentSubElement.innerHTML = 'i';
    }

    setLineBreak(): void {
        this.previousSubElement = this.currentSubElement;
        this.currentSubElement = DOMRenderer.createElement('tspan', 'svg');
        DOMRenderer.setAttribute(this.currentSubElement, 'x', this.currentX);
        DOMRenderer.setAttribute(this.currentSubElement, 'dy', '1em');
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', this.fontTextAlign);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);

    }
}
