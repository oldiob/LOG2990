import {HttpClientModule} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import { MatDialogModule, MatDialogRef } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {IndexService} from '../../services/index/index.service';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let indexServiceSpy: SpyObj<IndexService>;
  const matDialogRefSpy: jasmine.Spy = jasmine.createSpy('MAT_DIALOG_DATA');
  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['basicGet']);
    indexServiceSpy.basicGet.and.returnValue(of({title: '', body: ''}));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: IndexService, useValue: indexServiceSpy},
        {provide: MatDialogRef, useValue: matDialogRefSpy},
      ],
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
