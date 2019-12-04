import { DOMRenderer } from 'src/utils/dom-renderer';
import { SelectorTool } from './selector';
import { SelectorBox, SelectorState} from './selector-box';

fdescribe('SelectorTool', () => {

    let tool: SelectorTool;
    let svg: any;
    let selectorBox: SelectorBox;
    let selectorState: SelectorState;
    // let rect: Rect;

    beforeEach(() => {
        const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild', 'setStyle']);
        DOMRenderer.renderer = renderer;

        svg = jasmine.createSpyObj('SVGService', ['addElement', 'removeElement', 'getInRect', 'findAt', 'entry', 'resetCursor', 'cursor']);

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

    it('should left click when it is onPressed', () => {
        spyOn((tool as any), 'onLeftClick');
        const event = new MouseEvent('mousedown', { button: 0 });
        tool.onPressed(event);
        expect((tool as any).onLeftClick).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should right click when it is onPressed', () => {
        spyOn((tool as any), 'onRightClick');
        const event = new MouseEvent('mousedown', { button: 2 });
        tool.onPressed(event);
        expect((tool as any).onRightClick).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should deselect when it is onPressed', () => {
        const event = new MouseEvent('mousedown', { button: 2 });
        tool.onPressed(event);
        expect((tool as any).state).toEqual(SelectorState.UNSELECTING);
    });

    it('should hidePreview onPressed', () => {
        spyOn((tool as any), 'hidePreview');
        const event = new MouseEvent('mousedown');
        tool.onReleased(event);
        expect((tool as any).state).toEqual(SelectorState.NONE);
        expect((tool as any).dupOffset).toEqual([0, 0]);
        expect((tool as any).hidePreview).toHaveBeenCalled();
    });

    it('should change angle by step 15 onWheel', () => {
        const event = new WheelEvent('mousedown', {deltaY: 1});
        const mockAngle = Math.sign(event.deltaY) * (Math.PI / 180) * 15;
        tool.onWheel(event);
        expect(tool.onWheel(event)).toEqual(true);
        expect((tool as any).angle).toEqual(mockAngle);
    });

    it('should change angle by step 1 onWheel', () => {
        const event = new WheelEvent('altKey', {deltaY: 1});
        const mockAngle = Math.sign(event.deltaY) * (Math.PI / 180) * 1;
        tool.onWheel(event);
        if (event.altKey) {
            expect((tool as any).angle).toEqual(mockAngle);
        }
        expect(tool.onWheel(event)).toEqual(true);
    });

    /*('should onWheel rotate the selected object', () => {
        spyOn((tool as any), 'updateSelect');
        const event = new WheelEvent('altKey', {deltaY: 1});
        const mockAngle = Math.sign(event.deltaY) * (Math.PI / 180) * 15;
        (tool as any).state = SelectorState.NONE;
        rect = new Rect(2 , 2, 8, 8 );
        const elementsInRect: Set<SVGAbstract> = (tool as any).svg.getInRect(rect);
        elementsInRect.forEach((element) => {
            tool.selected.addChild(element);
            console.log(tool.selected.children.size);
        });
        tool.onPressed(new MouseEvent('click'));
        tool.onWheel(event);
        expect((tool as any).updateSelect).toHaveBeenCalled();
        expect((tool as any).angle).toEqual(mockAngle);
        expect(tool.onWheel(event)).toEqual(true);
    });*/

    it('should reset to state idle when released', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onReleased(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

    it('should update selected object hidebox', () => {
        spyOn((tool as any).selectorBox, 'hideBox');
        (tool as any).updateSelect();
        expect((tool as any).selectorBox.hideBox).toHaveBeenCalled();
    });

    it('should return selected children to 0', () => {
        (tool as any).isEmpty();
        expect((tool as any).isEmpty()).toBeTruthy();
    });

    it('should clear selection', () => {
        spyOn((tool as any).selectorBox, 'hideBox');
        spyOn((tool as any).selected, 'clear');
        tool.clearSelection();
        expect((tool as any).state).toEqual(SelectorState.NONE);
        expect((tool as any).isSelected).toBeFalsy();
        expect((tool as any).selectorBox.hideBox).toHaveBeenCalled();
        expect((tool as any).selected.clear).toHaveBeenCalled();
    });

});
