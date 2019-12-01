import { KeyService } from 'src/services/key/key.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { vectorMinus, vectorModule } from 'src/utils/math';
import { SVGService } from '../svg.service';
import { SVGAbstract } from './svg.abstract';

export class SVGText extends SVGAbstract {
    private readonly VERTICAL_SPACE = '1em';
    private readonly TEXTALIGN_CENTER = 'middle';
    private readonly TEXTALIGN_LEFT = 'start';
    private readonly TEXTALIGN_RIGHT = 'end';
    UNSET = '';
    ITALIC = 'italic';
    BOLD = 'bold';
    SPOT_TEXT = 'Enter text...';
    INVISIBLE_LINE_VALUE = 'INVISIBLE_LINE';
    isNewElement: boolean;
    element: any;
    currentSubElement: any;
    previousSubElement: any;
    isLastSubElement: true;
    subElements: any = [];
    currentX: string;
    offsetX = 0;

    textAlign: string;
    fontFamily: string;
    fontStyle: string;
    fontSize: number;
    fontWeight: string;
    content: string;

    private rectangle: SVGRectElement;

    constructor(keyService: KeyService, x: number, y: number, fontFamily: string,
                fontSize: number, textAlign: string, fontStyle: string, fontWeigth: string) {

        super();
        this.initRectangle();

        this.textAlign = textAlign;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.fontWeight = fontWeigth;

        keyService.disableKeys();

        this.element = DOMRenderer.createElement('text', 'svg');
        DOMRenderer.setAttribute(this.element, 'innerHTML', this.UNSET);
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());
        this.currentX = x.toString();

        DOMRenderer.setAttribute(this.element, 'font-size', fontSize.toString());
        DOMRenderer.setAttribute(this.element, 'font-family', fontFamily);
        DOMRenderer.setAttribute(this.element, 'font-style', fontStyle);
        DOMRenderer.setAttribute(this.element, 'font-weight', fontWeigth);

        this.currentSubElement = DOMRenderer.createElement('tspan', 'svg');
        DOMRenderer.setAttribute(this.currentSubElement, 'dy', this.VERTICAL_SPACE);
        DOMRenderer.setAttribute(this.currentSubElement, 'x', this.currentX);
        DOMRenderer.setAttribute(this.currentSubElement, 'text-anchor', this.textAlign);
        this.subElements.push(this.currentSubElement);
        DOMRenderer.appendChild(this.element, this.currentSubElement);

        this.currentSubElement.innerHTML = this.SPOT_TEXT;
        this.isNewElement = true;
    }

    private initRectangle(): void {
        this.rectangle = DOMRenderer.createElement('rect', 'svg', {
            fill: 'transparent',
            stroke: 'black',
        });
    }

    setRectangle(domRect: DOMRect): void {
        const svgService: SVGService = MyInjector.get(SVGService);
        svgService.removeElement(this.rectangle);
        svgService.addElement(this.rectangle);

        DOMRenderer.setAttributes(this.rectangle, {
            x: domRect.x.toString(),
            y: domRect.y.toString(),
            width: domRect.width.toString(),
            height: domRect.height.toString(),
        });
    }

    removeRectangle(): void {
        const svgService: SVGService = MyInjector.get(SVGService);
        svgService.removeElement(this.rectangle);
    }

    isAtAdjusted(x: number, y: number): boolean {
        const vectorTo: number[] = vectorMinus([x, y], this.position);
        return vectorModule(vectorTo) <= (this.domRect.width || this.domRect.height);
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }
    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'fill', color);
    }
    setSecondary(color: string): void {
        //
    }
    setFontSize(size: number): void {
        this.fontSize = size;
        DOMRenderer.setAttribute(this.element, 'font-size', this.fontSize.toString());
    }
    setFontFamily(fontfamily: string): void {
        this.fontFamily = fontfamily;
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
        this.resetX();
        switch (align) {
            case this.TEXTALIGN_LEFT:
                //
                break;
            case this.TEXTALIGN_CENTER:
                this.setX(this.domRect.width / 2);
                break;
            case this.TEXTALIGN_RIGHT:
                this.setX(this.domRect.width);
                break;
            default:
        }
        this.textAlign = align;
        for (const subElement of this.subElements) {
            DOMRenderer.setAttribute(subElement, 'text-anchor', this.textAlign);
        }
    }
    computeOffset(align: string): number {
        switch (align) {
            case this.TEXTALIGN_LEFT:
                //
                break;
            case this.TEXTALIGN_CENTER:
                this.offsetX = this.domRect.width / 2;
                break;
            case this.TEXTALIGN_RIGHT:
                this.offsetX = this.domRect.width;
                break;
            default:
        }
        return this.offsetX;
    }
    setX(deltaX: number): void {
        DOMRenderer.setAttribute(this.element, 'x', (Number(this.currentX) + deltaX).toString());
        for (const subElement of this.subElements) {
            DOMRenderer.setAttribute(subElement, 'x', (Number(this.currentX) + deltaX).toString());
        }
        this.currentX = (Number(this.currentX) + deltaX).toString();
        this.offsetX = deltaX;
    }
    resetX(): void {
        this.setX(-this.offsetX);
        this.offsetX = 0;
    }
    setCurrentPlaceholder(): void {
        DOMRenderer.setAttribute(this.currentSubElement, 'opacity', '0');
        this.currentSubElement.innerHTML = this.INVISIBLE_LINE_VALUE;
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

    removeCharacter(): void {
        switch (this.currentSubElement.innerHTML) {
            case this.INVISIBLE_LINE_VALUE:
                this.removeLine();
                break;
            case this.UNSET:
                this.removeLine();
                break;
            default:
                this.content = this.currentSubElement.innerHTML;
                this.content = this.content.substring(0, this.content.length - 1);
                this.currentSubElement.innerHTML = this.content;
        }
    }
    removeLine(): void {
        if (this.subElements.length > 1) {
            DOMRenderer.removeChild(this.element, this.currentSubElement);
            this.subElements.pop();
            this.currentSubElement = this.subElements[this.subElements.length - 1];
        }
    }
}
