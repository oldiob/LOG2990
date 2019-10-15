import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class Drawing {
  etiquette: string[];
  SVGObjects: SVGInterface[];
  name: string;

  constructor(etiquette: string[], SVGObjects: SVGInterface[], name: string) {
      this.etiquette = etiquette;
      this.SVGObjects = SVGObjects;
      this.name = name;
  }
}
