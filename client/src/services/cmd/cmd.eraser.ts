import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGService } from 'src/services/svg/svg.service';
import { MyInjector } from 'src/utils/injector';

export class CmdErase implements CmdInterface {

    object: SVGAbstract;
    index: number;

    svg: SVGService;

    constructor(obj: SVGAbstract) {
        this.object = obj;
        this.svg = MyInjector.get(SVGService);
    }

    execute(): void {
        this.svg.removeObject(this.object);
    }

    undo(): void {
        this.svg.addObject(this.object);
    }

    redo(): void {
        this.execute();
    }
}
