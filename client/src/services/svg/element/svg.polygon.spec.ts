import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { SVGPolygon } from './svg.polygon';

describe('SVGPolygon', () => {

    let renderer: any;
    let polygon: SVGPolygon;
    let nSides: number;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setAttribute']);
        RendererProvider.renderer = renderer;
        nSides = 3;
        polygon = new SVGPolygon(0, 0, nSides, TraceType.FillAndBorder);
    });

    it('should exits', () => {
        expect(polygon).toBeDefined();
    });

    it('should be clicked on', () => {
        polygon.setCursor(10, 10);
        expect(polygon.isAt(5, 5)).toBe(true);
        expect(polygon.isAt(0, 0)).toBe(false);
    });
});
