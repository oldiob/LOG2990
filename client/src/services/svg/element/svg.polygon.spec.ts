import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGPolygon } from './svg.polygon';

describe('SVGPolygon', () => {
    jasmine.getEnv().allowRespy(true);

    let renderer: Renderer2;
    let element: any;
    let perimeter: any;
    let baseElement: any;
    let children: any;

    let nSides: number;

    let polygon: SVGPolygon;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);

        element = jasmine.createSpyObj('any', ['children']);
        perimeter = jasmine.createSpyObj('any', ['']);
        baseElement = jasmine.createSpyObj('any', ['']);
        children = [perimeter, baseElement];
        element.children = children;

        DOMRenderer.renderer = renderer;

        spyOn(renderer, 'createElement').and.returnValue(element);
        nSides = 3;
        polygon = new SVGPolygon(0, 0, nSides, TraceType.FillAndBorder);
    });

    it('should exits', () => {
        expect(polygon).toBeDefined();
    });

    it('should be clicked on', () => {
        polygon.setCursor(10, 10);
        expect(polygon.isAt(5, 5)).toBe(true);
        expect(polygon.isAt(0, 0)).toBe(false);
    });
});
