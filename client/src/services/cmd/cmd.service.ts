import { BehaviorSubject, Observable } from 'rxjs';

export class CmdService {

    static undos: CmdInterface[] = [];
    static redos: CmdInterface[] = [];

    static isEmptyUndosSubject = new BehaviorSubject<boolean>(!CmdService.undos || !CmdService.undos.length);

    static isEmptyRedosSubject = new BehaviorSubject<boolean>(!CmdService.redos || !CmdService.redos.length);

    static get isEmptyUndosObservable(): Observable<boolean> {
        return CmdService.isEmptyUndosSubject.asObservable();
    }

    static get isEmptyRedosObservable(): Observable<boolean> {
        return CmdService.isEmptyRedosSubject.asObservable();
    }

    static nextUndo(): void {
        CmdService.isEmptyUndosSubject.next(!CmdService.undos || !CmdService.undos.length);
    }

    static nextRedo(): void {
        CmdService.isEmptyRedosSubject.next(!CmdService.redos || !CmdService.redos.length);
    }

    static execute(cmd: CmdInterface | null) {
        if (cmd) {
            cmd.execute();
            CmdService.redos.length = 0;
            CmdService.nextRedo();
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
        CmdService.nextUndo();
        CmdService.nextRedo();
    }
}

export interface CmdInterface {

    execute(): void;
    undo(): void;
    redo(): void;
}
