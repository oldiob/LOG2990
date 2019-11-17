import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';

export class CmdBucket implements CmdInterface {

    obj: SVGAbstract;
    primary: boolean;
    color: string;
    prevColor: string;

    constructor(obj: SVGAbstract, color: string, primary: boolean) {
        this.obj = obj;
        this.color = color;
        this.primary = primary;
    }

    execute(): void {
        if (this.primary) {
            this.prevColor = this.obj.getPrimary();
            this.obj.setPrimary(this.color);
        } else {
            this.prevColor = this.obj.getSecondary();
            this.obj.setSecondary(this.color);
        }
    }

    undo(): void {
        if (this.primary) {
            this.obj.setPrimary(this.prevColor);
        } else {
            this.obj.setSecondary(this.prevColor);
        }
    }

    redo(): void {
        if (this.primary) {
            this.obj.setPrimary(this.color);
        } else {
            this.obj.setSecondary(this.color);
        }
    }
}
