import { MyInjector } from 'src/utils/injector';
import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class CmdSVG implements CmdInterface {

    obj: SVGInterface;
    svg: SVGService;

    constructor(obj: SVGInterface) {
        this.obj = obj;
        this.svg = MyInjector.get(SVGService);
    }

    execute(): void {
        this.svg.addObject(this.obj);
    }

    undo(): void {
        this.svg.removeObject(this.obj);
    }

    redo(): void {
        this.execute();
    }
}
