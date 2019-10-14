import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { SVGRect } from './svg.rect';

fdescribe('SVGRect', () => {

    let renderer: any;
    let rect: SVGRect;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setAttribute']);
        rect = new SVGRect(0, 0, TraceType.FillAndBorder, renderer);
    });

    it('should exits', () => {
        expect(rect).toBeDefined();
    });

    it('should be clicked on', () => {

    });

    it('should return true when (x,y) is in its area', () => {
    });
});
