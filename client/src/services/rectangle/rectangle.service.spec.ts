import { TestBed } from '@angular/core/testing';
import { Rectangle } from '../../../../common/communication/rectangle';
import { RectangleService } from './rectangle.service';

fdescribe('RectangleService', () => {

    let rectService: RectangleService;
    let mouseEvent: MouseEvent;
    let rectangle: Rectangle;
    let rectangles: Rectangle[];
    beforeEach(() => {
        rectService = new RectangleService();
        TestBed.configureTestingModule({
            providers: [RectangleService],
        }).compileComponents();
        rectService = TestBed.get(RectangleService);
        mouseEvent = new MouseEvent('click');
        rectangle = {
            pointX: 50,
            pointY: 50,
            width: 100,
            height: 150,
        };
        rectangles = [rectangle];
    });

    it('should create', () => {
        expect(rectService).toBeTruthy();
    });

    it('should return the starting point of the rectangle', () => {
        rectService.startDrawRect(mouseEvent);
        expect(rectService.currentX).toEqual(rectService.mouseX);
        expect(rectService.currentY).toEqual(rectService.mouseY);
    });

    it('should return the width and height of the rectangle', () => {
        rectService.drawRect(mouseEvent);
        rectService.click = true;
        expect(rectService.width).toBeGreaterThanOrEqual(0);
        expect(rectService.height).toBeGreaterThanOrEqual(0);
    });

    it('should call pressShift() if it is clicked and shiftkey is true', () => {
        rectService.drawRect(new MouseEvent('event.shiftKey'));
        rectService.click = true;
        expect(rectService.pressShift).toBeTruthy();
    });

    it('should call addRectangle() when it is a keyup', () => {
        rectService.endDragMouse();
        expect(rectService.addRectangle).toBeTruthy();
    });

    it('should call addRectangle() when it is a keyup', () => {
        rectService.addRectangle();
        expect(rectangle).toEqual(rectangles[0]);
    });

    it('should select the point size',()=>{
        rectService.SelectPointSize(1);
        expect(rectService.pointSize).toEqual(1);

        rectService.SelectPointSize(-4);
        expect(rectService.pointSize).toEqual(1);
    });

    it('should give a string version of pointSize', ()=>{
        rectService.SelectPointSize(1);
        expect(rectService.pointSize.toString()).toEqual(rectService.GetPointSize());
    });

    it('should select the stroke opacity',()=>{
        rectService.SelectStrokeOpacity(0);
        expect(rectService.strokeOpacity).toEqual(0);

        rectService.SelectStrokeOpacity(-4);
        expect(rectService.strokeOpacity).toEqual(1);
    });

    it('should give a string version of strokeOpacity', ()=>{
        rectService.SelectStrokeOpacity(1);
        expect(rectService.strokeOpacity.toString()).toEqual(rectService.GetStrokeOpacity());
    });

    it('should select the fill opacity',()=>{
        rectService.SelectFillOpacity(0);
        expect(rectService.fillOpacity).toEqual(0);

        rectService.SelectFillOpacity(-4);
        expect(rectService.fillOpacity).toEqual(1);
    });
    
    it('should give a string version of fillOpacity', ()=>{
        rectService.SelectFillOpacity(1);
        expect(rectService.fillOpacity.toString()).toEqual(rectService.GetFillOpacity());
    });

    it('should select Trace type', ()=>{
        rectService.SelectStrokeOpacity(1);
        rectService.SelectFillOpacity(1);
        rectService.SelectTraceType(0);
        expect(rectService.strokeOpacity).toEqual(1);
        expect(rectService.fillOpacity).toEqual(0);
        expect(rectService.traceType).toEqual(0);

        rectService.SelectStrokeOpacity(1);
        rectService.SelectFillOpacity(1);
        rectService.SelectTraceType(1);
        expect(rectService.strokeOpacity).toEqual(0);
        expect(rectService.fillOpacity).toEqual(1);
        expect(rectService.traceType).toEqual(1);

        rectService.SelectStrokeOpacity(1);
        rectService.SelectFillOpacity(1);
        rectService.SelectTraceType(2);
        expect(rectService.strokeOpacity).toEqual(1);
        expect(rectService.fillOpacity).toEqual(1);
        expect(rectService.traceType).toEqual(2);

        rectService.SelectStrokeOpacity(1);
        rectService.SelectFillOpacity(1);
        rectService.SelectTraceType(4);
        expect(rectService.strokeOpacity).toEqual(1);
        expect(rectService.fillOpacity).toEqual(0);
        expect(rectService.traceType).toEqual(0);

    })
});
