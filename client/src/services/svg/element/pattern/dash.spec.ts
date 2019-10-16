import { SVGLine } from '../svg.line';
import { DashMotif } from './dash';

describe('DashMotif', () => {

    let dash: DashMotif;
    let line: SVGLine;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        line = jasmine.createSpyObj('SVGLine', ['renderer', 'lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        line.renderer = renderer;
        dash = new DashMotif();
    });

    it('should exists', () => {
        expect(dash).toBeTruthy();
    });

    it('should create dash element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        dash.create(line);
        expect(line.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a dash element', () => {
        dash.addPoint(line, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
    });
});
