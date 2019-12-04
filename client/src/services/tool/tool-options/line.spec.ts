import { DOMRenderer } from 'src/utils/dom-renderer';
import { JunctionType } from './i-tool';
import { LineTool } from './line';

describe('LineTool', () => {

    let element: any;
    let renderer: any;
    let paletteService: any;
    let svgService: any;
    let line: LineTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGLine', ['setPrimary', 'setWidth', 'isAt', 'isIn', 'addAnchor',
            'setCursor', 'lineLoop', 'finish', 'end', 'popAnchor']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        svgService = jasmine.createSpyObj('SVGService', ['addObject', 'removeObject']);
        DOMRenderer.renderer = renderer;
        line = new LineTool(paletteService, svgService);
        line.junctionType = JunctionType.Round;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(line).toBeTruthy();
    });

    it('should do nothing on motion if no element is selected', () => {
        (line as any).element = null;
        line.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });

    it('should loose reference to the newly created element when released', () => {
        line.onReleased(event);
        expect((line as any).element).toBe(null);
    });

    it('should return true if is doubleclick', () => {
        (line as any).element = element;
        line.onReleased(event);
        event.doubleClick = true;
        expect(event.doubleClick).toBeTruthy();
    });

    it('should call addAnchor when it is onPressed', () => {
        element.junctionType = JunctionType.Round;
        (line as any).element = element;
        line.onPressed(event);
        expect(element.addAnchor).toHaveBeenCalledWith(event.svgX, event.svgY, element.junctionType);
    });

    it('should call setCursor when it is onMotion', () => {
        (line as any).element = element;
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

    it('should escape key call abort function ', () => {
        spyOn((line as any), 'abort');
        const escape = new KeyboardEvent('keydown', {
            key: 'Escape',
            cancelable: true,
        });
        line.onKeyup(escape);
        expect((line as any).abort).toHaveBeenCalled();
    });

    it('should backspace key should return true ', () => {
        const backspace = new KeyboardEvent('keydown', {
            key: 'Backspace',
            cancelable: true,
        });
        line.onKeyup(backspace);
        expect(line.onKeyup(backspace)).toBeTruthy();
    });

    it('should backspace key should erase the last line ', () => {
        (line as any).element = element;
        const backspace = new KeyboardEvent('keydown', {
            key: 'Backspace',
            cancelable: true,
        });
        line.onKeyup(backspace);
        expect(element.popAnchor).toHaveBeenCalled();
    });

    it('should d key should return false ', () => {
        const d = new KeyboardEvent('keydown', {
            key: 'd',
            cancelable: true,
        });
        line.onKeyup(d);
        expect(line.onKeyup(d)).toBeFalsy();
    });

    it('should set element to null when it is abort ', () => {
        (line as any).element = element;
        (line as any).abort();
        expect(element.end).toHaveBeenCalled();
    });

    it('should set element to null when it is commit ', () => {
        (line as any).element = element;
        (line as any).commit();
        expect(element.end).toHaveBeenCalled();
        expect(svgService.removeObject).toHaveBeenCalled();
    });

    it('should appear in the showcase ', () => {
        spyOn(line, 'onPressed');
        spyOn(line, 'onReleased');
        spyOn(line, 'onMotion');
        line.onShowcase(event.svgX, event.svgY);
        expect(line.onPressed).toHaveBeenCalled();
        expect(line.onReleased).toHaveBeenCalled();
        expect(line.onMotion).toHaveBeenCalled();
    });
});
