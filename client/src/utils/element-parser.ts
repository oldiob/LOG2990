import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { Prototypes } from './prototypes';

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
    svgService.clearDrawArea();
    for (const e of holder.elements) {
        svgService.addObject(deserializeSVG(e));
    }
};

const serializeSVG = (element: SVGInterface): string => {
    const holder = new ElementHolder();

    holder.type = element.constructor.name;
    holder.elementData = element;
    holder.svgData = element.element.outerHTML;

    return JSON.stringify(holder);
};

const deserializeSVG = (json: string): any => {
    const element: any = JSON.parse(json);

    const svgElement: SVGInterface = element.elementData;
    Object.setPrototypeOf(svgElement, Prototypes.get(element.type));

    const fakeElement = new DOMParser().parseFromString(element.svgData, 'image/svg+xml').children[0];

    svgElement.element = recreateElement(fakeElement);

    return svgElement;
};

/**
 * The parsed elements dont keep their namespace, we need to recreate their attributes and children.
 */
const recreateElement = (fakeElement: any): any => {
    const realElement = DOMRenderer.createElement(fakeElement.nodeName, 'svg');

    for (const attribute of fakeElement.attributes) {
        DOMRenderer.setAttribute(realElement, attribute.nodeName, attribute.nodeValue);
    }

    for (const child of fakeElement.children) {
        DOMRenderer.appendChild(realElement, recreateElement(child));
    }

    return realElement;
};

// tslint:disable-next-line: max-classes-per-file
export class DrawAreaHolder {
    entry: string;
    elements: string[];
}

// tslint:disable-next-line: max-classes-per-file
class ElementHolder {
    type: string;
    elementData: SVGInterface;
    svgData: string;
}
