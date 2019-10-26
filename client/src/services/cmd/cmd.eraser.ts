import { MyInjector } from 'src/utils/injector';
import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class CmdEraser implements CmdInterface {

    objs: SVGInterface[];
    svg: SVGService;
    areErased: boolean;

    constructor() {
        this.objs = [];
        this.svg = MyInjector.get(SVGService);

        this.areErased = true;
    }

    eraseObject(obj: SVGInterface | null): void {
        if (obj !== null) {
            this.objs.push(obj);
            this.svg.removeObject(obj);
        }
    }

    execute(): void {
        if (!this.areErased) {
            this.objs.forEach((obj) => this.svg.removeObject(obj));
            this.areErased = true;
        }
    }

    undo(): void {
        if (this.areErased) {
            this.objs.forEach((obj) => this.svg.addObject(obj));
            this.areErased = false;
        }
    }

    redo(): void {
        this.execute();
    }
}
