// tslint:disable-next-line:only-arrow-functions
export function CmdMock(): any {
    return jasmine.createSpyObj('CmdMock', ['execute', 'undo', 'redo']);
}
