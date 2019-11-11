import { async, TestBed } from '@angular/core/testing';
import { MyInjector } from 'src/utils/injector';
import {CmdEraser} from './cmd.eraser';

fdescribe('cmdEraser', () => {
    let cmdEraser: CmdEraser;
    // const svgSpy = jasmine.createSpyObj('SVGService', ['removeObject' ]);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CmdEraser],
        }).compileComponents();
    }));

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        cmdEraser = new CmdEraser();
        //   cmdEraser = TestBed.get(CmdEraser);
        // cmdEraser.svg = MyInjector.get(svgSpy);
      });

    it('should be created', () => {
      expect(cmdEraser).toBeTruthy();
    });

});
