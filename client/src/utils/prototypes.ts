import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { SVGBucketFill } from 'src/services/svg/element/svg.bucket-fill';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { SVGLine } from 'src/services/svg/element/svg.line';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { SVGPolygon } from 'src/services/svg/element/svg.polygon';
import { SVGRectangle } from 'src/services/svg/element/svg.rectangle';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { SVGText } from 'src/services/svg/element/svg.text';

export class Prototypes {
    private static mPrototypes: Map<string, object> | null = null;

    static get(name: string): object | null {
        if (Prototypes.mPrototypes === null) {
            Prototypes.mPrototypes = new Map();

            for (const prot of listOfPrototypes) {
                Prototypes.mPrototypes.set(prot.constructor.name, prot);
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
    SVGPolygon.prototype,
    SVGText.prototype,
    SVGPen.prototype,
    SVGAirbrush.prototype,
    SVGBucketFill.prototype,
];
