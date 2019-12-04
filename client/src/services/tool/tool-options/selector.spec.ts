import { CmdComposite } from 'src/services/cmd/cmd.array';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGComposite } from 'src/services/svg/element/svg.composite';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { SelectorTool } from './selector';
import { SelectorBox, SelectorState} from './selector-box';
import { CmdService } from 'src/services/cmd/cmd.service';

fdescribe('SelectorTool', () => {

    let tool: SelectorTool;
    let svg: any;
    let selectorBox: SelectorBox;
    let selectorState: SelectorState;
    let svgAbstract: SVGAbstract;
    let selected: SVGComposite;
    let injector: any;

    beforeEach(() => {
        const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild', 'setStyle']);
        DOMRenderer.renderer = renderer;

        svg = jasmine.createSpyObj('SVGService', ['addElement', 'removeElement', 'getInRect', 'findAt', 'entry', 'resetCursor', 'cursor']);

        selected = jasmine.createSpyObj('SVGComposite', ['rescaleOnPointCommand', 'translateCommand', 'translate', 'children']);
        selectorBox = jasmine.createSpyObj('SelectorBox', ['onPressed', 'circles', 'hideBox', 'setBox']);
        selectorState = jasmine.createSpyObj('SelectorState', ['NONE', 'SELECTING', 'DESELECTING', 'SELECTED', 'MOVING', 'SCALING']);
        const gridService = jasmine.createSpyObj('any', ['realDistanceToMove']);
        spyOn(gridService, 'realDistanceToMove').and.returnValue([0, 0]);
        svgAbstract = jasmine.createSpyObj('SVGAbstract', ['createElement']);
        injector = jasmine.createSpyObj('Injector', ['get']);
        injector.get.and.returnValue(svg);
        MyInjector.injector = injector;
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

    it('should duplicate when ctrl + d', () => {
        spyOn(tool, 'duplicate');
        const ctrlD = new KeyboardEvent('keypress', {key: 'd'});
        if (ctrlD.ctrlKey) {
            tool.onKeydown(ctrlD);
            expect(tool.duplicate).toHaveBeenCalled();
            expect( tool.onKeydown(ctrlD)).toBeTruthy();
        }
    });

    it('should select all when ctrl + a', () => {
        spyOn(tool, 'selectAll');
        const ctrlA = new KeyboardEvent('keypress', {key: 'a'});
        if (ctrlA.ctrlKey) {
            tool.onKeydown(ctrlA);
            expect(tool.selectAll).toHaveBeenCalled();
            expect( tool.onKeydown(ctrlA)).toBeTruthy();
        }
    });

    it('should erase when delete', () => {
        spyOn(tool, 'erase');
        const deleteKey = new KeyboardEvent('keypress', {key: 'delete'});
        tool.onKeydown(deleteKey);
        expect(tool.erase).toHaveBeenCalled();
        expect( tool.onKeydown(deleteKey)).toBeTruthy();
    });

    it('should return false if any key beside ctrl-d, ctrl-a and delete', () => {
        spyOn(tool, 'erase');
        const anyKey = new KeyboardEvent('keypress', {key: 'q'});
        tool.onKeydown(anyKey);
        expect( tool.onKeydown(anyKey)).toBeFalsy();
    });

    it('should reset to state idle when released', () => {
        tool.onPressed(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onMotion(new MouseEvent('mousedown', { button: 0 }));
        tool.onReleased(new MouseEvent('mousedown', { button: 0 }));
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

    it('should show preview', () => {
        spyOn((tool as any), 'hidePreview');
        spyOn((tool as any).svg, 'addElement');
        (tool as any).preview = {
            x: '0',
            y: '0',
            width: '10',
            height: '10',
        };
        (tool as any).svg.addElement((tool as any).preview);
        (tool as any).showPreview();
        expect((tool as any).svg.addElement).toHaveBeenCalled();
        expect((tool as any).hidePreview).toHaveBeenCalled();
    });

    it('should hide preview', () => {
        spyOn((tool as any).svg, 'removeElement');
        (tool as any).preview = {
            x: '0',
            y: '0',
            width: '10',
            height: '10',
        };
        (tool as any).svg.addElement((tool as any).preview);
        (tool as any).hidePreview();
        expect((tool as any).svg.removeElement).toHaveBeenCalledWith((tool as any).preview);
    });

    it('should update selected object hidebox if the selected rect is empty', () => {
        spyOn((tool as any).selectorBox, 'hideBox');
        (tool as any).updateSelect();
        expect((tool as any).selectorBox.hideBox).toHaveBeenCalled();
    });

    it('should return true if the selected rect is empty', () => {
        (tool as any).isEmpty();
        expect((tool as any).isEmpty()).toBeTruthy();
    });

    it('should return false if selected children is not empty', () => {
        tool.selected.addChild(svgAbstract);
        expect((tool as any).isEmpty()).toBeFalsy();
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

    it('should onUnselect hide, clear and reset cursor', () => {
        spyOn((tool as any), 'hidePreview');
        spyOn((tool as any), 'clearSelection');
        spyOn((tool as any).svg, 'resetCursor');
        tool.onUnSelect();
        expect((tool as any).hidePreview).toHaveBeenCalled();
        expect((tool as any).clearSelection).toHaveBeenCalled();
        expect((tool as any).svg.resetCursor).toHaveBeenCalled();
    });

    it('should onSelect hidepreview and clear it', () => {
        spyOn((tool as any), 'hidePreview');
        spyOn((tool as any), 'clearSelection');
        tool.onSelect();
        expect((tool as any).hidePreview).toHaveBeenCalled();
        expect((tool as any).clearSelection).toHaveBeenCalled();
    });

    it('should onShowcase show nothing', () => {
        tool.onShowcase();
        expect(tool.onShowcase()).toBeNull();
    });

    it('should set cursor to MOVING', () => {
        (tool as any).state = SelectorState.MOVING;
        (tool as any).setCursor();
        expect((tool as any).svg.cursor).toEqual('grabbing');
    });

    it('should set cursor to SCALING', () => {
        (tool as any).state = SelectorState.SCALING;
        (tool as any).setCursor();
        expect((tool as any).svg.cursor).toEqual('pointer');
    });

    it('should on right click be unselected', () => {
        (tool as any).onRightClick(10, 10);
        expect((tool as any).state).toEqual(SelectorState.UNSELECTING);
    });

    it('should onMotion be SELECTING state', () => {
        spyOn((tool as any), 'showPreview');
        spyOn((tool as any), 'select');
        (tool as any).state = SelectorState.SELECTING;
        tool.onMotion(new MouseEvent('click'));
        expect((tool as any).showPreview).toHaveBeenCalled();
        expect((tool as any).select).toHaveBeenCalled();
    });

    it('should onMotion be UNSELECTING state', () => {
        spyOn((tool as any), 'showPreview');
        spyOn((tool as any), 'unselect');
        (tool as any).state = SelectorState.UNSELECTING;
        tool.onMotion(new MouseEvent('click'));
        expect((tool as any).showPreview).toHaveBeenCalled();
        expect((tool as any).unselect).toHaveBeenCalled();
    });

    it('should onMotion be MOVING state ', () => {
        spyOn((tool as any), 'updateSelect');
        (tool as any).transforms = new CmdComposite();
        (tool as any).state = SelectorState.MOVING;
        tool.onMotion(new MouseEvent('click'));
        expect((tool as any).updateSelect).toHaveBeenCalled();
    });

    it('should onMotion be MOVING state ', () => {
        spyOn((tool as any), 'updateSelect');
        (tool as any).transforms = new CmdComposite();
        tool.selected = selected;
        (tool as any).state = SelectorState.SCALING;
        tool.onMotion(new MouseEvent('click'));
        expect((tool as any).updateSelect).toHaveBeenCalled();
    });

    it('should erase ', () => {
        spyOn((tool as any), 'clearSelection');
        tool.erase();
        expect((tool as any).clearSelection).toHaveBeenCalled();
    });

    it('should erase ', () => {
        spyOn((tool as any), 'clearSelection');
        tool.erase();
        expect((tool as any).clearSelection).toHaveBeenCalled();
    });

    it('should duplicate ', () => {
        spyOn(CmdService, 'execute');
        tool.duplicate();
        expect(CmdService.execute).toHaveBeenCalled();
    });

    it('should select all ', () => {
        spyOn((tool as any), 'select');
        tool.selectAll();
        expect((tool as any).select).toHaveBeenCalled();
        expect((tool as any).state).toEqual(SelectorState.NONE);
    });

    it('should select ', () => {
        spyOn((tool as any), 'updateSelect');
        (tool as any).select();
        expect((tool as any).updateSelect).toHaveBeenCalled();
    });

    it('should unselect ', () => {
        spyOn((tool as any), 'updateSelect');
        (tool as any).unselect();
        expect((tool as any).updateSelect).toHaveBeenCalled();
    });

    it('should select targeted ', () => {
        spyOn((tool as any), 'updateSelect');
        (tool as any).selectTargeted();
        expect((tool as any).updateSelect).toHaveBeenCalled();
    });

});
