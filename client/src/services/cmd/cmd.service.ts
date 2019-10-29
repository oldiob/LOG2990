import { BehaviorSubject, Observable } from 'rxjs';

export class CmdService {

    static undos: CmdInterface[] = [];
    static redos: CmdInterface[] = [];

    static undosSubject = new BehaviorSubject<CmdInterface[]>(CmdService.undos);
    static redosSubject = new BehaviorSubject<CmdInterface[]>(CmdService.redos);

    static get undosObservable(): Observable<CmdInterface[]> {
        return CmdService.undosSubject.asObservable();
    }

    static get redosObservable(): Observable<CmdInterface[]> {
        return CmdService.redosSubject.asObservable();
    }

    private static nextUndo() {
        CmdService.undosSubject.next(CmdService.undos);
    }

    private static nextRedo() {
        CmdService.redosSubject.next(CmdService.redos);
    }

    static execute(cmd: CmdInterface | null) {
        if (cmd) {
            cmd.execute();
            CmdService.redos.length = 0;
            CmdService.undos.push(cmd);
            CmdService.nextUndo();
        }
    }

    static undo(): CmdInterface | undefined {
        const cmd: CmdInterface | undefined = CmdService.undos.pop();
        CmdService.nextUndo();
        if (cmd) {
            cmd.undo();
            CmdService.redos.push(cmd);
            CmdService.nextRedo();
        }
        return cmd;
    }

    static redo(): CmdInterface | undefined {
        const cmd: CmdInterface | undefined = CmdService.redos.pop();
        CmdService.nextRedo();
        if (cmd) {
            cmd.redo();
            CmdService.undos.push(cmd);
            CmdService.nextUndo();
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
