import { CmdInterface } from 'src/services/cmd/cmd.service';

export class CmdArray<T extends CmdInterface> implements CmdInterface {

    cmds: T[] = new Array<T>();

    execute(): void {
        this.cmds.forEach((cmd) => cmd.execute());
    }

    undo(): void {
        this.cmds.forEach((cmd) => cmd.undo());
    }

    redo(): void {
        this.cmds.forEach((cmd) => cmd.redo());
    }
}
