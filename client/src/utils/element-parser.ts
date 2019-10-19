import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { Prototypes } from './prototypes';
import { SVGService } from 'src/services/svg/svg.service';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

export const serializeDrawArea = (svgService: SVGService): string => {
    const holder = new DrawAreaHolder();

    holder.entry = svgService.entry.nativeElement.outerHTML;

    holder.elements = [];
    for (const obj of svgService.objects) {
        holder.elements.push(serializeSVG(obj));
    }

    return JSON.stringify(holder);
};

export const populateDrawArea = (svgService: SVGService, information: string): void => {
    const elements = JSON.parse(information);

    svgService.clearDrawArea();
    for (const e of elements.elements) {
        svgService.addObject(deserializeSVG(e));
    }

    console.log('after', svgService.objects);
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
    const realElement = RendererProvider.renderer.createElement(fakeElement.nodeName, 'svg');

    for (const attribute of fakeElement.attributes) {
        RendererProvider.renderer.setAttribute(realElement, attribute.nodeName, attribute.nodeValue);
    }

    for (const child of fakeElement.children) {
        RendererProvider.renderer.appendChild(realElement, recreateElement(child));
    }

    return realElement;
};

// tslint:disable-next-line: max-classes-per-file
class DrawAreaHolder {
    entry: string;
    elements: string[];
}

// tslint:disable-next-line: max-classes-per-file
class ElementHolder {
    type: string;
    elementData: SVGInterface;
    svgData: string;
}
