import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { DrawAreaComponent } from './draw-area.component';

describe('DrawAreaComponent', () => {
    let component: DrawAreaComponent;
    let fixture: ComponentFixture<DrawAreaComponent>;
    let toolService: ToolService;
    // const rectCursor = `url(./../assets/images/${'rectangle-cursor.svg'}), crosshair`;
    let tool: ITool;
    let entry: ElementRef;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrawAreaComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        tool = jasmine.createSpyObj('ITool', ['onReleased', 'onMotion', 'onPressed', 'CURSOR_FILENAME']);
        fixture = TestBed.createComponent(DrawAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        entry = jasmine.createSpyObj('ElementRef', ['']);
        component.entry = entry;
        toolService = TestBed.get(ToolService);
        // component.ngOnInit();
        toolService.currentTool = tool;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should return the current style', () => {
    //     component.height = 10;
    //     component.width = 10;
    //     component.backgroundColor = '#ffffffff';
    //     component.currentStyles = {
    //         height: `${component.height.toString()}px`,
    //         width: `${component.width.toString()}px`,
    //         'background-color': component.backgroundColor,
    //         cursor: rectCursor,
    //     };
    //     expect(component.setCurrentStyles()).toEqual(component.currentStyles);
    // });

    // it('should on mouseup return false when it is mousedown and released event tool  ', () => {
    //     component.onMouseUp(new MouseEvent('mouseup'));
    //     expect(component.isMouseDown).toBeFalsy();
    //     expect(component.isOnceWhileDown).toBeTruthy();
    //     expect(mockTool.onReleased).toHaveBeenCalled();
    // });

});
