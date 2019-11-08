import { KeyService } from 'src/services/key/key.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class SVGText implements SVGInterface {
    isNewElement = true;
    EMPTYSTRING = '';
    ITALIC = 'italic';
    BOLD = 'bold';
    element: any;
    currentSubElement: any;
    previousSubElement: any;
    isLastSubElement: true;
    subElements: any = [];
    currentX: string;

    textAlign: string;
    fontFamily: string;
    fontStyle: string;
    fontSize: string;
    fontWeight: string;

    constructor(keyService: KeyService, x: number, y: number, fontFamily: string,
                fontSize: string, textAlign: string, fontStyle: string, fontWeigth: string ) {

        this.textAlign = textAlign;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.fontWeight = fontWeigth;

    constructor(keyService: KeyService, x: number, y: number) {
        keyService.disableShortcut();
        this.element = DOMRenderer.createElement('text', 'svg');
        this.element.innerHTML = this.EMPTYSTRING;
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());
        this.currentX = x.toString();

        DOMRenderer.setAttribute(this.element, 'font-size', fontSize);
        DOMRenderer.setAttribute(this.element, 'font-family', fontFamily );
        DOMRenderer.setAttribute(this.element, 'font-style', fontStyle);
        DOMRenderer.setAttribute(this.element, 'font-weight', fontWeigth);

        this.currentSubElement = DOMRenderer.createElement('tspan', 'svg');
        DOMRenderer.setAttribute(this.currentSubElement, 'dy', '1em');
        DOMRenderer.setAttribute(this.currentSubElement, 'x', this.currentX);
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', this.textAlign);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);
        this.currentSubElement.innerHTML = 'Enter text...';
        this.isNewElement = true;
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
    setFontFamily(fontfamily: string): void {
        this.fontFamily = fontfamily;
        DOMRenderer.setAttribute(this.element, 'font-family', this.fontFamily );
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
        this.textAlign = align;
        for (const subElement of this.subElements) {
            DOMRenderer.setAttribute(subElement, 'text-anchor', this.textAlign);
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
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', this.textAlign);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);

    }
}
