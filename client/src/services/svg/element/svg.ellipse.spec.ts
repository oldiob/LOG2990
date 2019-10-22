import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { SVGEllipse } from './svg.ellipse';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Renderer2 } from '@angular/core';

describe('SVGEllipse', () => {
    jasmine.getEnv().allowRespy(true);

    let renderer: Renderer2;
    let element: any;
    let perimeter: any;
    let baseElement: any;
    let children: any;

    let ellipse: SVGEllipse;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);

        element = jasmine.createSpyObj('any', ['children']);
        perimeter = jasmine.createSpyObj('any', ['']);
        baseElement = jasmine.createSpyObj('any', ['']);
        children = [perimeter, baseElement];
        element.children = children;

        DOMRenderer.renderer = renderer;
        spyOn(renderer, 'createElement').and.returnValue(element);

        ellipse = new SVGEllipse(0, 0, TraceType.FillAndBorder);
    });

    it('should exits', () => {
        expect(ellipse).toBeDefined();
    });

    it('should be clicked on', () => {
        ellipse.setCursor(10, 10, false);
        expect(ellipse.isAt(5, 5)).toBe(true);
        expect(ellipse.isAt(0, 0)).toBe(false);
    });
});