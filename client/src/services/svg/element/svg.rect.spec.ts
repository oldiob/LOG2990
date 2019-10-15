import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { SVGRect } from './svg.rect';

describe('SVGRect', () => {

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
        expect(rect.isAt(0, 0)).toBe(true);
        expect(rect.isAt(-10000, -10000)).toBe(false);
    });
});
