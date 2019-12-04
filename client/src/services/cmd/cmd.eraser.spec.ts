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
        spyObj = jasmine.createSpyObj('SVGAbstract', ['isAtAdjusted', 'isIn', 'getPrimary', 'getSecondary',
                                                        'setPrimary', 'setSecondary', 'setWidth', 'addPoint',
                                                        'pointsAttribute']);
        svgService = jasmine.createSpyObj('SVGService', ['getPrimary', 'getSecondary', 'entry', 'addObject', 'removeObject']);
        cmdEraser = new CmdErase(spyObj);
        cmdEraser.svg = svgService;
      });

    it('should be created', () => {
      expect(cmdEraser).toBeTruthy();
    });

});
