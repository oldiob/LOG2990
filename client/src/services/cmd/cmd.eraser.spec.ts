import {CmdEraser} from './cmd.eraser';

fdescribe('cmdEraser', () => {
    let cmdEraser: CmdEraser;
    const svgSpy = jasmine.createSpyObj('SVGService', ['removeObject' ]);
    /*const spyObj = jasmine.createSpyObj('SVGPencil', ['isAtAdjusted', 'isIn', 'getPrimary', 'getSecondary',
                                                        'setPrimary', 'setSecondary', 'setWidth', 'addPoint',
                                                        'pointsAttribute']);*/

    beforeEach(() => {
          cmdEraser = new CmdEraser();
          cmdEraser.svg = svgSpy;
      });

    it('should be created', () => {
      expect(cmdEraser).toBeTruthy();
    });

});
