import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { SVGLine } from 'src/services/svg/element/svg.line';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { AbsSVGShape } from 'src/services/svg/element/svg.abs-shape';
import { SVGRectangle } from 'src/services/svg/element/svg.rectangle';

export class Prototypes {
    private static mPrototypes: Map<string, object> | null = null;

    static get(name: string): object | null {
        if (Prototypes.mPrototypes === null) {
            Prototypes.mPrototypes = new Map();

            console.log('PROTOTYPES', listOfPrototypes);
            for (const p of listOfPrototypes) {
                Prototypes.mPrototypes.set(p.constructor.name, p);
            }
        }
        const p: object | undefined = Prototypes.mPrototypes.get(name);
        if (p === undefined) {
            console.error('Prototype of ' + name + ' is not defined. Add it to the list in prototypes.ts.');
            return null;
        }

        return p;
    }
}

const listOfPrototypes = [
    SVGPencil.prototype,
    SVGBrush.prototype,
    SVGRectangle.prototype,
    SVGLine.prototype,
    SVGEllipse.prototype,
    SVGStamp.prototype,
    AbsSVGShape.prototype,
];
