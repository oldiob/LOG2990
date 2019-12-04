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

        selectorBox = jasmine.createSpyObj('SelectorBox', ['onPressed', 'circles', 'hideBox']);

        selectorState = jasmine.createSpyObj('SelectorState', ['NONE', 'SELECTING', 'DESELECTING', 'SELECTED', 'MOVING', 'SCALING']);
        const gridService = jasmine.createSpyObj('any', ['realDistanceToMove']);
        spyOn(gridService, 'realDistanceToMove').and.returnValue([0, 0]);

        const entry = jasmine.createSpyObj('any', ['nativeElement']);
        const nativeElement = jasmine.createSpyObj('any', ['getBoundingClientRect']);
        svg.entry = entry;
        entry.nativeElement = nativeElement;

        svg.getInRect.and.returnValue(new Set<any>([]));
        svg.findAt.and.returnValue(new Set<any>([]));
        tool = new SelectorTool(svg, gridService);
        (tool as any).selectorBox = selectorBox;
        (tool as any).state = selectorState;

    });

    it('should construct correctly', () => {
        expect(tool).toBeTruthy();
    });

    it('should select when it is onPressed', () => {
        spyOn((tool as any), 'onLeftClick');
        const event = new MouseEvent('mousedown', { button: 0 });
        tool.onPressed(event);
        expect((tool as any).onLeftClick).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should deselect when it is onPressed', () => {
        const event = new MouseEvent('mousedown', { button: 2 });
        tool.onPressed(event);
        expect((tool as any).state).toEqual(SelectorState.UNSELECTING);
    });

    it('should reset to state idle when released', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onReleased(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

});
