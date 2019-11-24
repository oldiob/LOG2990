import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { Subject } from 'rxjs';
import { GridService } from 'src/services/grid/grid.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { ShowcaseSignal } from 'src/utils/showcase-signal';
import { DrawAreaComponent } from './draw-area.component';

describe('DrawAreaComponent', () => {
    let component: DrawAreaComponent;
    let fixture: ComponentFixture<DrawAreaComponent>;
    let renderer: Renderer2;
    let subjectSpy: Subject<null>;
    let object: object;

    let workZoneService: WorkZoneService;
    let svgService: SVGService;
    let toolService: ToolService;
    let gridService: GridService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrawAreaComponent],
            providers: [ToolService],
            imports: [MatDialogModule, MatSnackBarModule, HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        subjectSpy = jasmine.createSpyObj('Subject<null>', ['next']);
        (ShowcaseSignal as any).subject = subjectSpy;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);

        object = jasmine.createSpyObj('object', ['isNative']);
        spyOn(Object, 'getPrototypeOf').and.returnValue(object);

        workZoneService = jasmine.createSpyObj('WorkZoneService', ['setFromDrawing']);
        svgService = jasmine.createSpyObj('SVGService', ['findIn']);
        toolService = jasmine.createSpyObj('ToolService', ['currentTool']);
        gridService = jasmine.createSpyObj('GridService', ['draw']);

        fixture = TestBed.createComponent(DrawAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
        (component as any).oldTool = object;
        (component as any).workZoneService = workZoneService;
        (component as any).svgService = svgService;
        (component as any).toolService = toolService;
        (component as any).gridService = gridService;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
