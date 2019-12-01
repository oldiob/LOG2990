import { CmdComposite } from './cmd.array';
import { CmdMock } from './cmd.mock.spec';

describe('CmdArray', () => {

    let arr: CmdComposite<any>;
    let N: number;

    beforeEach(() => {
        N = Math.floor(1000 * Math.random());
        arr = new CmdComposite<any>();
        for (let i = 0; i < N; ++i) {
            arr.cmds.push(CmdMock());
        }
    });

    it('should construct', () => {
        arr.cmds.forEach((cmd) => {
            expect(cmd.execute).not.toHaveBeenCalled();
            expect(cmd.undo).not.toHaveBeenCalled();
            expect(cmd.redo).not.toHaveBeenCalled();
        });
    });

    it('should execute', () => {
        arr.execute();
        arr.cmds.forEach((cmd) => {
            expect(cmd.execute).toHaveBeenCalled();
        });
    });

    it('should undo', () => {
        arr.undo();
        arr.cmds.forEach((cmd) => {
            expect(cmd.undo).toHaveBeenCalled();
        });
    });

    it('should redo', () => {
        arr.redo();
        arr.cmds.forEach((cmd) => {
            expect(cmd.redo).toHaveBeenCalled();
        });
    });
});
