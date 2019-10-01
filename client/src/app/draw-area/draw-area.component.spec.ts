import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { DrawAreaComponent } from './draw-area.component';

fdescribe('DrawAreaComponent', () => {
    let component: DrawAreaComponent;
    let fixture: ComponentFixture<DrawAreaComponent>;
    // let mockToolService: ToolService;
    // const rectCursor = `url(./../assets/images/${'rectangle-cursor.svg'}), crosshair`;
    // let mockTool: ITool;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrawAreaComponent],
            providers: [ToolService],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        // mockTool = jasmine.createSpyObj('ITool', ['onReleased', 'onMotion', 'onPressed', 'CURSOR_FILENAME']);
        fixture = TestBed.createComponent(DrawAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
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
