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

    fontTextAlign: string;

    constructor(keyService: KeyService, x: number, y: number) {
        this.fontTextAlign = this.EMPTYSTRING;
        keyService.setIsBlocking(true);
        this.element = DOMRenderer.createElement('text', 'svg');
        this.element.innerHTML = this.EMPTYSTRING;
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
        DOMRenderer.setAttribute(this.element, 'font-size', size);
    }
    setFontFamily(fontfamliy: string): void {
        DOMRenderer.setAttribute(this.element, 'font-family', fontfamliy);
    }
    setFontStyle(style: string): void {
        DOMRenderer.setAttribute(this.element, 'font-style', style);
    }
    setFontWeight(weight: string): void {
        DOMRenderer.setAttribute(this.element, 'font-weight', weight);
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
