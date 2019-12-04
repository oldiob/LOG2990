// import { DOMRenderer } from 'src/utils/dom-renderer';
// import { SelectorBox, SelectorState } from './selector-box';

// describe('SelectorBox', () => {

//     let tool: SelectorBox;
//     const circlePos = [123, 456];
//     const rectX = 0;
//     const rectY = 0;
//     const rectW = 10;
//     const rectH = 10;

//     beforeEach(() => {
//         const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild', 'setStyle']);
//         DOMRenderer.renderer = renderer;

//         const svg = jasmine.createSpyObj('SVGService', ['addElement', 'removeElement']);

//         tool = new SelectorBox(svg);

//         const circle = jasmine.createSpyObj('any', ['cx', 'cy']);
//         circle.cx = jasmine.createSpyObj('any', ['baseVal']);
//         circle.cy = jasmine.createSpyObj('any', ['baseVal']);
//         circle.cx.baseVal = jasmine.createSpyObj('any', ['value']);
//         circle.cy.baseVal = jasmine.createSpyObj('any', ['value']);
//         circle.cx.baseVal.value = circlePos[0];
//         circle.cy.baseVal.value = circlePos[1];
//         (tool as any).circles = [circle];

//         const rect = jasmine.createSpyObj('any', ['x', 'y', 'width', 'height']);
//         rect.x = jasmine.createSpyObj('any', ['baseVal']);
//         rect.y = jasmine.createSpyObj('any', ['baseVal']);
//         rect.width = jasmine.createSpyObj('any', ['baseVal']);
//         rect.height = jasmine.createSpyObj('any', ['baseVal']);

//         rect.x.baseVal = jasmine.createSpyObj('any', ['value']);
//         rect.y.baseVal = jasmine.createSpyObj('any', ['value']);
//         rect.width.baseVal = jasmine.createSpyObj('any', ['value']);
//         rect.height.baseVal = jasmine.createSpyObj('any', ['value']);

//         rect.x.baseVal.value = rectX;
//         rect.y.baseVal.value = rectY;
//         rect.width.baseVal.value = rectW;
//         rect.height.baseVal.value = rectH;

//         (tool as any).rectangle = rect;
//     });

//     it('should construct correctly', () => {
//         expect(tool).toBeTruthy();
//     });

//     it('should return scaling state', () => {
//         const circleRadius = (tool as any).CIRCLE_RADIUS;
//         const cursorOffset = [Math.random() * circleRadius - 1, Math.random() * circleRadius - 1];

//         expect(tool.onPressed(circlePos[0] + cursorOffset[0], circlePos[1] + cursorOffset[1])).toEqual(SelectorState.SCALING);
//     });

    /* TODO
    it('should return moving state', () => {

//         const cursorOffset = [Math.random() * 10, Math.random() * 10];

        expect(tool.onPressed(cursorOffset[0], cursorOffset[1])).toEqual(SelectorState.MOVING);
    });
    */

//     it('should return a none state', () => {
//         expect(tool.onPressed(11, 11)).toEqual(SelectorState.NONE);
//     });

//     it('should return correct opposite index', () => {
//         (tool as any).circles = new Array(8);
//         expect((tool as any).getOppositeIndex(0)).toEqual(4);
//         expect((tool as any).getOppositeIndex(3)).toEqual(7);
//         expect((tool as any).getOppositeIndex(5)).toEqual(1);
//     });

//     it('should return correct scaling multiplier', () => {
//         (tool as any).circles = new Array(8);

//         (tool as any).targetedAnchor = 0;
//         expect(tool.getScalingMultiplier()).toEqual([1, 1]);

//         (tool as any).targetedAnchor = 3;
//         expect(tool.getScalingMultiplier()).toEqual([1, 0]);

//         (tool as any).targetedAnchor = 5;
//         expect(tool.getScalingMultiplier()).toEqual([0, 1]);
//     });

//     it('should flip correctly', () => {
//         (tool as any).circles = new Array(8);

//         (tool as any).targetedAnchor = 0;
//         tool.flipVertically();
//         expect((tool as any).targetedAnchor).toEqual(6);

//         (tool as any).targetedAnchor = 0;
//         tool.flipHorizontally();
//         expect((tool as any).targetedAnchor).toEqual(2);

//         (tool as any).targetedAnchor = 3;
//         tool.flipVertically();
//         expect((tool as any).targetedAnchor).toEqual(3);

//         (tool as any).targetedAnchor = 3;
//         tool.flipHorizontally();
//         expect((tool as any).targetedAnchor).toEqual(7);

//         (tool as any).targetedAnchor = 5;
//         tool.flipVertically();
//         expect((tool as any).targetedAnchor).toEqual(1);

//         (tool as any).targetedAnchor = 5;
//         tool.flipHorizontally();
//         expect((tool as any).targetedAnchor).toEqual(5);
//     });
// });
