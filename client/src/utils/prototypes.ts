import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { SVGLine } from 'src/services/svg/element/svg.line';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';

export class Prototypes {
    private static mPrototypes: Map<string, object> | null = null;

    static get(name: string): object | null {
        if (Prototypes.mPrototypes === null) {
            Prototypes.mPrototypes = new Map();

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
    SVGRect.prototype,
    SVGLine.prototype,
    SVGEllipse.prototype,
    SVGStamp.prototype,
];
