import { ElementRef } from '@angular/core';
import { DrawAreaHolder } from 'src/services/draw-area/draw-area-holder';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Prototypes } from './prototypes';

export const svgToImage = (entry: ElementRef, fn: CallableFunction): void => {
    const canvas = DOMRenderer.createElement('canvas');

    DOMRenderer.setAttribute(canvas, 'width',
        entry.nativeElement.attributes.width.nodeValue);
    DOMRenderer.setAttribute(canvas, 'height',
        entry.nativeElement.attributes.height.nodeValue);

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const svgOuterHTML = entry.nativeElement.outerHTML;

    const svgImage: HTMLImageElement = new Image();

    svgImage.onload = () => fn(svgImage, ctx, canvas);
    svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(svgOuterHTML);
};

export const serializeDrawArea = (svgService: SVGService): DrawAreaHolder => {
    const holder = new DrawAreaHolder();

    holder.entry = svgService.entry.nativeElement.outerHTML;

    holder.elements = [];
    for (const obj of svgService.objects) {
        holder.elements.push(serializeSVG(obj));
    }

    return holder;
};

export const populateDrawArea = (svgService: SVGService, holder: DrawAreaHolder): void => {
    svgService.clearObjects();
    for (const e of holder.elements) {
        svgService.addObject(deserializeSVG(e));
    }
};

const serializeSVG = (element: SVGAbstract): string => {
    const holder = new ElementHolder();

    holder.type = element.constructor.name;
    holder.elementData = element;
    holder.svgData = element.element.outerHTML;

    return JSON.stringify(holder);
};

const deserializeSVG = (json: string): any => {
    const element: any = JSON.parse(json);

    const svgElement: SVGAbstract = element.elementData;
    Object.setPrototypeOf(svgElement, Prototypes.get(element.type));

    const fakeElement = new DOMParser().parseFromString(element.svgData, 'image/svg+xml').children[0];

    svgElement.element = recreateElement(fakeElement);

    return svgElement;
};

/**
 * The parsed elements dont keep their namespace, we need to recreate their attributes and children.
 */
export const recreateElement = (realElement: any): any => {
    const fakeElement = DOMRenderer.createElement(realElement.nodeName, 'svg');

    for (const attribute of realElement.attributes) {
        DOMRenderer.setAttribute(fakeElement, attribute.nodeName, attribute.nodeValue);
    }

    if (realElement.children.length !== 0) {
        for (const child of realElement.children) {
            DOMRenderer.appendChild(fakeElement, recreateElement(child));
        }
    } else {
        fakeElement.innerHTML = realElement.innerHTML;
    }

    return fakeElement;
};

// tslint:disable-next-line: max-classes-per-file
class ElementHolder {
    type: string;
    elementData: SVGAbstract;
    svgData: string;
}
