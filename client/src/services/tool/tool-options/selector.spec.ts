import { DOMRenderer } from 'src/utils/dom-renderer';
import { SelectorTool } from './selector';
import { SelectorBox, SelectorState} from './selector-box';

describe('SelectorTool', () => {

    let tool: SelectorTool;
    let svg: any;
    let selectorBox: SelectorBox;
    let selectorState: SelectorState;

    beforeEach(() => {
        const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild', 'setStyle']);
        DOMRenderer.renderer = renderer;

        svg = jasmine.createSpyObj('SVGService', ['addElement', 'removeElement', 'getInRect', 'findAt', 'entry']);

        selectorBox = jasmine.createSpyObj('SelectorBox', ['onPressed', 'circles']);

        selectorState = SelectorState.NONE;

        const entry = jasmine.createSpyObj('any', ['nativeElement']);
        const nativeElement = jasmine.createSpyObj('any', ['getBoundingClientRect']);
        svg.entry = entry;
        entry.nativeElement = nativeElement;

        svg.getInRect.and.returnValue(new Set<any>([]));
        svg.findAt.and.returnValue(new Set<any>([]));
        tool = new SelectorTool(svg);
        (tool as any).selectorBox = selectorBox;
        (tool as any).state = selectorState;

    });

    it('should construct correctly', () => {
        expect(tool).toBeTruthy();
    });

    it('should to nothing on wheel event', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 1 }));
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

    it('should change state to maybe if idle', () => {
        expect((tool as any).state).toEqual(SelectorState.NONE);
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.SELECTING);
    });

    it('should set the anchor on the first motion', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.SELECTING);
    });

    it('should set the cursor on continous motion', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.SELECTING);
    });

    it('should reset to state idle when released', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onReleased(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

});
