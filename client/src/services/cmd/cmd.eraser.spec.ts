import { async, TestBed } from '@angular/core/testing';
// import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { MyInjector } from 'src/utils/injector';
import {CmdEraser} from './cmd.eraser';

describe('cmdEraser', () => {
    let cmdEraser: CmdEraser;
    /*const spyObj = jasmine.createSpyObj('SVGAbstract', ['isAtAdjusted', 'isIn', 'getPrimary', 'getSecondary',
                                                        'setPrimary', 'setSecondary', 'setWidth', 'addPoint',
                                                        'pointsAttribute']);*/

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CmdEraser],
        }).compileComponents();
    }));

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        cmdEraser = new CmdEraser();
      });

    it('should be created', () => {
      expect(cmdEraser).toBeTruthy();
    });

    /*it ('should accomplish task correctly if parameter isnt null', () => {
        //const obj = new SVGPencil();
        cmdEraser.svg.addObject(spyObj);
        cmdEraser.eraseObject(spyObj);
        expect(cmdEraser.objs.length).toEqual(1);
    });*/

    it('execute should accomplish its task correctly if areEqual is false', () => {
        cmdEraser.areErased = false;
        cmdEraser.execute();
        expect(cmdEraser.areErased).toEqual(true);
    });

    it('execute should not do anything if areEqual is true', () => {
        cmdEraser.areErased = true;
        cmdEraser.execute();
        expect(cmdEraser.areErased).toEqual(true);
    });

    it('undo should accomplish its task correctly if areEqual is true', () => {
        cmdEraser.areErased = true;
        cmdEraser.undo();
        expect(cmdEraser.areErased).toEqual(false);
    });

    it('undo should not do anything if areEqual is false', () => {
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
