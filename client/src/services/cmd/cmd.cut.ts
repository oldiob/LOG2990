import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { MyInjector } from 'src/utils/injector';

export class CmdCut implements CmdInterface {

    obj: SVGInterface[] = [];
    svg: SVGService;

    constructor(obj: SVGInterface | SVGInterface[]) {
        if (obj instanceof Array) {
            this.obj = obj;
        }
        else {
            this.obj = [obj];
        }
        this.svg = MyInjector.get(SVGService);
    }

    execute(): void {
        this.obj.forEach((obj) => {
            this.svg.removeObject(obj);
        });
    }

    undo(): void {
        this.obj.forEach((obj) => {
            this.svg.addObject(obj);
        });
    }

    redo(): void {
        this.execute();
    }
}
