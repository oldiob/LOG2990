import { CmdBucket } from './cmd.bucket';

fdescribe('CmdBucket', () => {

    let cmd: CmdBucket;
    let svgAbstract: any;
    let color: string;
    let prevColor: string;
    let primary: boolean;

    beforeEach(() => {
        color = '0xFFFFFFFF';
        prevColor = '0xF0F0F0F0';
        primary = true;
        svgAbstract = jasmine.createSpyObj('SVGAbstract', ['createElement', 'getPrimary', 'getSecondary', 'setPrimary', 'setSecondary']);
        cmd = new CmdBucket(svgAbstract, color, primary);
    });

    it('should construct with an SVGAbstract array as a parameter', () => {
        expect(cmd).toBeTruthy();
        expect(cmd.primary).toEqual(primary);
        expect(cmd.color).toEqual(color);
    });

    it('should call setPrimary when executed when primary equals true', () => {
        cmd.execute();
        expect(cmd.obj.setPrimary).toHaveBeenCalled();
    });

    it('should call setSecondary when executed when primary equals false', () => {
        cmd.primary = false;
        cmd.execute();
        expect(cmd.obj.setSecondary).toHaveBeenCalled();
    });

    it('should call setPrimary when undo when primary equals true', () => {
        cmd.prevColor = prevColor;
        cmd.undo();
        expect(cmd.obj.setPrimary).toHaveBeenCalled();
    });

    it('should call setSecondary when undo when primary equals false', () => {
        cmd.primary = false;
        cmd.prevColor = prevColor;
        cmd.undo();
        expect(cmd.obj.setSecondary).toHaveBeenCalled();
    });

    it('should call setPrimary when redo when primary equals true', () => {
        cmd.redo();
        expect(cmd.obj.setPrimary).toHaveBeenCalled();
    });

    it('should call setSecondary when redo when primary equals false', () => {
        cmd.primary = false;
        cmd.redo();
        expect(cmd.obj.setSecondary).toHaveBeenCalled();
    });
});
