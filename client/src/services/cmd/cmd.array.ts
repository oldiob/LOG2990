import { CmdInterface } from 'src/services/cmd/cmd.service';

export class CmdComposite implements CmdInterface {

    commands: CmdInterface[];

    constructor() {
        this.commands = [];
    }

    addChild(command: CmdInterface) {
        this.commands.push(command);
    }

    execute(): void {
        this.commands.forEach((cmd) => cmd.execute());
    }

    undo(): void {
        this.commands.reduceRight((_, cmd) => cmd.undo(), null);
    }

    redo(): void {
        this.commands.forEach((cmd) => cmd.redo());
    }
}
