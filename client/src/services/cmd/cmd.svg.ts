import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGService } from 'src/services/svg/svg.service';
import { MyInjector } from 'src/utils/injector';

export class CmdSVG implements CmdInterface {

    obj: SVGAbstract[] = [];
    svg: SVGService;

    constructor(obj: SVGAbstract | SVGAbstract[]) {
        if (obj instanceof Array) {
            this.obj = obj;
        } else {
            this.obj = [obj];
        }
        this.svg = MyInjector.get(SVGService);
    }

    execute(): void {
        this.obj.forEach((obj) => {
            this.svg.addObject(obj);
        });
    }

    undo(): void {
        this.obj.forEach((obj) => {
            this.svg.removeObject(obj);
        });
    }

    redo(): void {
        this.execute();
    }
}
