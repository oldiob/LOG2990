import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { MyInjector } from 'src/utils/injector';

export class CmdDup implements CmdInterface {

    obj: SVGInterface[] = [];
    svg: SVGService;
    offset: number;

    constructor(objects: SVGInterface[], offset: number) {
        this.offset = offset;
        this.obj = objects.map((obj) => {
            const tmp: SVGInterface = Object.create(obj);
            tmp.element = obj.element.cloneNode(true);
            if (tmp.move) {
                tmp.move(this.offset, this.offset);
            }
            return tmp;
        });
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
