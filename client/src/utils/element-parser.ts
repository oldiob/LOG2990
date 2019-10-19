import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { Prototypes } from './prototypes';

export const serializeSVG = (element: SVGInterface): string => {
    const holder = new ElementHolder();

    holder.type = element.constructor.name;
    holder.elementData = element;
    holder.svgData = element.element.outerHTML;

    return JSON.stringify(holder);
};

export const deserializeSVG = (json: string): any => {
    const element: ElementHolder = JSON.parse(json);

    const svgElement: SVGInterface = element.elementData;
    Object.setPrototypeOf(svgElement, Prototypes.get(element.type));

    svgElement.element = new DOMParser().parseFromString(element.svgData, 'image/svg+xml').children[0];

    return svgElement;
};

class ElementHolder {
    type: string;
    elementData: SVGInterface;
    svgData: string;
}
