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
        this.index = -1;
        this.svg = MyInjector.get(SVGService);
    }

    execute(): void {
        this.index = this.svg.objects.indexOf(this.object);
        this.svg.removeObject(this.object);
    }

    undo(): void {
        this.svg.addObjectToPosition(this.object, this.index);
    }

    redo(): void {
        this.execute();
    }
}
