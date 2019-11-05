import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { WorkZoneComponent } from './work-zone.component';

export class MockWorkService extends WorkZoneService {
}

describe('WorkZoneComponent', () => {
  let component: WorkZoneComponent;
  let workZoneService: WorkZoneService;
  let fixture: ComponentFixture<WorkZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkZoneComponent],
      providers: [
        { provide: WorkZoneService, useClass: MockWorkService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkZoneComponent);
    component = fixture.componentInstance;
    workZoneService = new WorkZoneService();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the WorkZoneComponent', () => {
    expect(component).toBeDefined();
  });

  it('should create the WorkZoneService', () => {
    expect(workZoneService).toBeDefined();
  });

  it('should update width and height when component is created', () => {
    updateDimensions(component, workZoneService);
  });

  it('#onResize() should update width and height when component is created', () => {
    component.onResize();
    updateDimensions(component, workZoneService);
  });

});

const updateDimensions = (component: WorkZoneComponent, workZoneService: WorkZoneService) => {
  const width = component.workZone.nativeElement.offsetWidth;
  const height = component.workZone.nativeElement.offsetHeight;
  workZoneService.updateDimensions(width, height);
  workZoneService.currentMaxWidth.subscribe((currentWidth) => {
    expect(currentWidth).toBe(width);
  });
  workZoneService.currentMaxHeight.subscribe((currentHeight) => {
    expect(currentHeight).toBe(height);
  });
};
