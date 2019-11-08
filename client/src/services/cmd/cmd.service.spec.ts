import { async, TestBed } from '@angular/core/testing';
import {CmdInterface, CmdService} from './cmd.service';

describe('cmdService', () => {
    // tslint:disable-next-line: prefer-const
    let cmd: CmdInterface;
    const spyObj = jasmine.createSpyObj('CmdEraser', ['eraseObject', 'execute', 'undo', 'redo']);
    const CMD_SERVICE_MOCK = {
      provide: CmdService,
      useFactory: () => ({
        instant: jasmine.createSpy('instant').and.callFake((msg) => msg),
      }),
    };

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CmdService,
      ],
    })
      .compileComponents();
  }));

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [CMD_SERVICE_MOCK]});
    });

    afterEach(() => {
      sessionStorage.clear();
    });

    it('should be created', () => {
      expect(CMD_SERVICE_MOCK).toBeTruthy();
    });

    it('isEmptyUndosObservable should return asObservable', () => {
      expect(CmdService.isEmptyUndosObservable).toEqual(CmdService.isEmptyUndosSubject.asObservable());
    });

    it('isEmptyRedosObservable should return asObservable', () => {
      expect(CmdService.isEmptyRedosObservable).toEqual(CmdService.isEmptyRedosSubject.asObservable());
    });

    it('execute should do something if called with CmdInterface', () => {
      spyOn(CmdService, 'nextRedo');
      CmdService.execute(cmd);
      expect(CmdService.redos.length).toEqual(0);
    });

    it('undo should be called correctly when the cmd inside is undefinied', () => {
      const tempCmd = CmdService.undos.pop();
      expect(CmdService.undo()).toEqual(tempCmd);
    });

    it('redo should be called correctly when the cmd inside is undefinied', () => {
      const tempCmd = CmdService.undos.pop();
      expect(CmdService.redo()).toEqual(tempCmd);
    });

    it('undo should be called correctly when not undefined', () => {
      spyOn(CmdService, 'nextRedo');
      CmdService.undos.push(spyObj);
      CmdService.undo();
      expect(CmdService.nextRedo).toHaveBeenCalled();
      CmdService.undos.pop();
      CmdService.redos.pop();
    });

    it('redo should be called correctly when not undefined', () => {
      spyOn(CmdService, 'nextUndo');
      CmdService.redos.push(spyObj);
      CmdService.redo();
      expect(CmdService.nextUndo).toHaveBeenCalled();
      CmdService.redos.pop();
      CmdService.undos.pop();
    });

    it('reset should be called correctly', () => {
      CmdService.reset();
      expect(CmdService.redos.length).toEqual(0);
    });

});
