import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class Drawing {
    etiquette: string[];
    blob: any;
    name: string;

    constructor(etiquette: string[], objects: SVGInterface[], name: string) {

        this.blob = objects.map((obj) => {
            if (obj.serialize) {
                return obj.serialize();
            }
            return null;
        });
        this.etiquette = etiquette;
        this.name = name;
    }
}
