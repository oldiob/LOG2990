import { SVGLine } from '../svg.line';
import { FullMotif } from './full';

describe('FullMotif', () => {

    let full: FullMotif;
    let line: SVGLine;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        line = jasmine.createSpyObj('SVGLine', ['renderer', 'lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        line.renderer = renderer;
        full = new FullMotif();
    });

    it('should exists', () => {
        expect(full).toBeTruthy();
    });

    it('should create dash element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        full.create(line);
        expect(line.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a dash element', () => {
        full.addPoint(line, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
    });
});
