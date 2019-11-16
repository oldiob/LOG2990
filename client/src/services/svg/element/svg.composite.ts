import { SVGAbstract } from './svg.abstract';

export class SVGComposite extends SVGAbstract {

    private children: SVGAbstract[];

    constructor() {
        super();
        this.children = [];
    }

    addChild(child: SVGAbstract) {
        this.children.push(child);
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        return;
    }
    setSecondary(color: string): void {
        return;
    }
    protected isAtAdjusted(x: number, y: number): boolean {
        return false;
    }

}
