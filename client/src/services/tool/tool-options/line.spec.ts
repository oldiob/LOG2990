import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { JunctionType } from './i-tool';
import { LineTool } from './line';

describe('LineTool', () => {

    let element: any;
    let renderer: any;
    let paletteService: any;
    let line: LineTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGLine', ['setPrimary', 'setWidth', 'isAt', 'isIn', 'addAnchor',
        'setCursor', 'lineLoop', 'finish', 'end', 'popAnchor']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        RendererProvider.renderer = renderer;
        line = new LineTool(paletteService);
        line.junctionType = JunctionType.Round;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(line).toBeTruthy();
    });

    it('should do nothing on motion if no element is selected', () => {
        line.element = null;
        line.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });

    it('should loose reference to the newly created element when released', () => {
        line.onReleased(event);
        expect(line.element).toBe(null);
    });

    it('should return true if is doubleclick', () => {
        line.element = element;
        line.onReleased(event);
        event.doubleClick = true;
        expect(event.doubleClick).toBeTruthy();
    });

    it('should call addAnchor when it is onPressed', () => {
        element.junctionType = JunctionType.Round;
        line.element = element;
        line.onPressed(event);
        expect(element.addAnchor).toHaveBeenCalledWith(event.svgX, event.svgY, element.junctionType);
    });

    it('should call setCursor when it is onMotion', () => {
        line.element = element;
        line.onMotion(event);
        expect(element.setCursor).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should escape key should return true ', () => {
        const escape = new KeyboardEvent('keydown', {
            key: 'Escape',
            cancelable: true,
        });
        line.onKeyup(escape);
        expect(line.onKeyup(escape)).toBeTruthy();
    });

    it('should backspace key should return true ', () => {
        const backspace = new KeyboardEvent('keydown', {
            key: 'Backspace',
            cancelable: true,
        });
        line.onKeyup(backspace);
        expect(line.onKeyup(backspace)).toBeTruthy();
    });

    it('should d key should return false ', () => {
        const d = new KeyboardEvent('keydown', {
            key: 'd',
            cancelable: true,
        });
        line.onKeyup(d);
        expect(line.onKeyup(d)).toBeFalsy();
    });
});
