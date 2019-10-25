export class CmdService {

    static undos: CmdInterface[] = [];
    static redos: CmdInterface[] = [];

    static execute(cmd: CmdInterface | null) {
        if (cmd) {
            cmd.execute();
            CmdService.redos.length = 0;
            CmdService.undos.push(cmd);
        }
    }

    static undo(): CmdInterface | undefined {
        const cmd: CmdInterface | undefined = CmdService.undos.pop();
        if (cmd) {
            cmd.undo();
            CmdService.redos.push(cmd);
        }
        return cmd;
    }

    static redo(): CmdInterface | undefined {
        const cmd: CmdInterface | undefined = CmdService.redos.pop();
        if (cmd) {
            cmd.redo();
            CmdService.undos.push(cmd);
        }
        return cmd;
    }

    static reset(): void {
        CmdService.redos.length = 0;
        CmdService.undos.length = 0;
    }
}


export interface CmdInterface {

    execute(): void;
    undo(): void;
    redo(): void;
}
