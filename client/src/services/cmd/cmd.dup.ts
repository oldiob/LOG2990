import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { MyInjector } from 'src/utils/injector';

export class CmdDup implements CmdInterface {

    private obj: SVGAbstract[] = [];
    private svg: SVGService;
    private offset: number;

    constructor(objects: SVGAbstract[], offset: number) {
        this.offset = offset;
        this.obj = objects.map((obj) => {
            const tmp: SVGAbstract = Object.create(obj);
            tmp.element = obj.element.cloneNode(true);
            tmp.translate(this.offset, this.offset);
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
