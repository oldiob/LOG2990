import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { SVGRectangle } from './svg.rectangle';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

describe('SVGRect', () => {

    let renderer: any;
    let rect: SVGRectangle;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setAttribute']);
        RendererProvider.renderer = renderer;

        rect = new SVGRectangle(0, 0, TraceType.FillAndBorder);
    });

    it('should exits', () => {
        expect(rect).toBeDefined();
    });

    it('should be clicked on', () => {
        expect(rect.isAt(0, 0)).toBe(true);
        expect(rect.isAt(-10000, -10000)).toBe(false);
    });
});
