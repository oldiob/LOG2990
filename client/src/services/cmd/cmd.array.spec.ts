import { CmdComposite } from './cmd.array';
import { CmdMock } from './cmd.mock.spec';

describe('CmdArray', () => {

    let arr: CmdComposite;
    let N: number;

    beforeEach(() => {
        N = Math.floor(1000 * Math.random());
        arr = new CmdComposite();
        for (let i = 0; i < N; ++i) {
            (arr as any).commands.push(CmdMock());
        }
    });

    it('should construct', () => {
         (arr as any).commands.forEach((command: { execute: any; undo: any; redo: any; }) => {
            expect(command.execute).not.toHaveBeenCalled();
            expect(command.undo).not.toHaveBeenCalled();
            expect(command.redo).not.toHaveBeenCalled();
        });
    });

    it('should execute', () => {
        arr.execute();
        (arr as any).commands.forEach((cmd: { execute: any; }) => {
            expect(cmd.execute).toHaveBeenCalled();
        });
    });

    it('should undo', () => {
        arr.undo();
        (arr as any).commands.forEach((cmd: { undo: any; }) => {
            expect(cmd.undo).toHaveBeenCalled();
        });
    });

    it('should redo', () => {
        arr.redo();
        (arr as any).commands.forEach((cmd: { redo: any; }) => {
            expect(cmd.redo).toHaveBeenCalled();
        });
    });
});
