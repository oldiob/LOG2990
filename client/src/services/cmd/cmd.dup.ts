import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGService } from 'src/services/svg/svg.service';
import { copySVG } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';

export class CmdDup implements CmdInterface {

    private obj: SVGAbstract[] = [];
    private svg: SVGService;
    private offset: number[];

    constructor(objects: SVGAbstract[], offset: number[]) {
        this.offset = offset;
        this.obj = objects.map((obj: SVGAbstract) => {
            const tmp: SVGAbstract = copySVG(obj);
            tmp.translate(this.offset[0], this.offset[1]);
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
