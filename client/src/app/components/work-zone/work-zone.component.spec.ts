import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkZoneService } from 'src/app/services/work-zone.service';
import { WorkZoneComponent } from './work-zone.component';

describe('WorkZoneComponent', () => {
  let component: WorkZoneComponent;
  let workZoneService: WorkZoneService;
  let fixture: ComponentFixture<WorkZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkZoneComponent],
      providers: [
        { provide: WorkZoneService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    });

    fixture = TestBed.createComponent(WorkZoneComponent);
    component = fixture.componentInstance;
    workZoneService = TestBed.get(WorkZoneService);
  });

  it('should create the WorkZoneComponent', () => {
    expect(component).toBeDefined();
  });

  it('should create the WorkZoneService', () => {
    expect(workZoneService).toBeDefined();
  });

  describe('ngOnOnit() method', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WorkZoneComponent);
      component = fixture.componentInstance;
      workZoneService = TestBed.get(WorkZoneService);
    });

    it('should update width when component is created', () => {
      const width = component.workZone.nativeElement.offsetWidth;
      expect(workZoneService.currentWidth).toBe(width);
    });

    it('should update height when component is created', () => {
      const height = component.workZone.nativeElement.offsetHeight;
      expect(workZoneService.currentHeight).toBe(height);
    });
  });

  describe('onResize() method', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(WorkZoneComponent);
      component = fixture.componentInstance;
      component.onResize();
      workZoneService = TestBed.get(WorkZoneService);
    });

    it('should update width when component is created', () => {
      const width = component.workZone.nativeElement.offsetWidth;
      expect(workZoneService.currentWidth).toBe(width);
    });

    it('should update height when component is created', () => {
      const height = component.workZone.nativeElement.offsetHeight;
      expect(workZoneService.currentHeight).toBe(height);
    });
  });

});
