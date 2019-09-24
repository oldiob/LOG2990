import { SVGInterface } from './svg.interface';

export class SVGPencil implements SVGInterface {
    TYPE: string = 'polyline';
    attributes: any;

    readonly SVG_STRING: string = "<polyline fill='${fill} s'/>"
    fill: string = 'none';
    constructor() {
        this.attributes = {
            fill: 'none',
            stroke-linecap: 'round',
            stroke-linejoin: 'round',
            points: [],
            stroke: 'black',
            stroke-width: 1,
        }
    }


    isAt(x: number, y: number): boolean {
        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        return false;
    }
    setPrimary(color: string): void {
        //
    }
    setSecondary(color: string): void {
        //
    }
    getPrimary(): string {
        return this.attributes['stroke'].toString();
    }
    getSecondary(): string {
        return '0';
    }

    setThickness(thickness: string): void {
        throw new Error('Method not implemented.');
    }

    addPoint(x: number, y: number): void {
        this.attributes['points'].push(x + ',' + y);
    }

    toString(): string {
    
        let sb = '<' + this.TYPE;

        let keys = Object.keys(this.attributes);
        for (let i = 0; i < keys.length; i++) {
            let key: string = keys[i];
            sb += ' ' + key + '=\'';
            if (key != 'points') {
                sb += this.attributes[key];
            }
            else {
                let points = this.attributes[key];
                for (let j = 0; j < points.length; j++) {
                    sb += points[j] + ' ';
                }
            }
            sb += '\'';
        }

        return sb + '/>';
    }
}
