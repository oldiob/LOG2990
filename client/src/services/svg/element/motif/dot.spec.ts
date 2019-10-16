import { SVGLine } from '../svg.line';
import { DotMotif } from './dot';

describe('DotMotif', () => {

    let dot: DotMotif;
    let line: SVGLine;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        line = jasmine.createSpyObj('SVGLine', ['renderer', 'lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        line.renderer = renderer;
        dot = new DotMotif();
    });

    it('should exists', () => {
        expect(dot).toBeTruthy();
    });

    it('should create dash element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        dot.create(line);
        expect(line.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a dash element', () => {
        dot.addPoint(line, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
    });
});
