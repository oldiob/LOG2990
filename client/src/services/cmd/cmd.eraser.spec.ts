import { async, TestBed } from '@angular/core/testing';
// import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { MyInjector } from 'src/utils/injector';
import {CmdErase} from './cmd.eraser';

describe('cmdEraser', () => {
    let cmdEraser: CmdErase;
    let spyObj: any;
    let svgService: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CmdErase],
        }).compileComponents();
    }));

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        cmdEraser = new CmdErase();
        spyObj = jasmine.createSpyObj('SVGAbstract', ['isAtAdjusted', 'isIn', 'getPrimary', 'getSecondary',
                                                        'setPrimary', 'setSecondary', 'setWidth', 'addPoint',
                                                        'pointsAttribute']);
        svgService = jasmine.createSpyObj('SVGService', ['getPrimary', 'getSecondary', 'entry', 'addObject', 'removeObject']);
        cmdEraser.svg = svgService;
      });

    it('should be created', () => {
      expect(cmdEraser).toBeTruthy();
    });

    it ('should accomplish task correctly if parameter isnt null', () => {
        cmdEraser.eraseObject(spyObj);
        expect(cmdEraser.object).toBeTruthy();
    });

    it('execute put areEqual to true if areEqual is false', () => {
        cmdEraser.areErased = false;
        cmdEraser.execute();
        expect(cmdEraser.areErased).toEqual(true);
    });

    it('execute should change areEqual if areEqual is true', () => {
        cmdEraser.areErased = true;
        cmdEraser.execute();
        expect(cmdEraser.areErased).toEqual(true);
    });

    it('undo should change areErased to false if areEqual is true', () => {
        cmdEraser.areErased = true;
        cmdEraser.undo();
        expect(cmdEraser.areErased).toEqual(false);
    });

    it('undo should not change areEqual if areEqual is false', () => {
        cmdEraser.areErased = false;
        cmdEraser.undo();
        expect(cmdEraser.areErased).toEqual(false);
    });

    it('redo should call execute', () => {
        cmdEraser.areErased = false;
        cmdEraser.redo();
        expect(cmdEraser.areErased).toEqual(true);
    });

});
