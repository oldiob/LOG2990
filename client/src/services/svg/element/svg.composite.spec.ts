import { Renderer2 } from '@angular/core';
import { CmdComposite } from 'src/services/cmd/cmd.array';
import { CmdTransform } from 'src/services/cmd/cmd.matrix';
import { SelectorBox } from 'src/services/tool/tool-options/selector-box';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMultiplyConst, vectorPlus } from 'src/utils/math';
import { SVGService } from '../svg.service';
import { SVGAbstract } from './svg.abstract';
import { SVGComposite } from './svg.composite';
import { SVGPencil } from './svg.pencil';

ddescribe('SVGComposite', () => {
    jasmine.getEnv().allowRespy(true);

    let renderer: Renderer2;
    let element: any;
    let event: any;
    let children: any;
    let composite: SVGComposite;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        const SVGPencilFirst = new SVGPencil();
        const SVGPencilSecond = new SVGPencil();
        element = jasmine.createSpyObj('any', ['children']);
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);
        children = [SVGPencilFirst, SVGPencilSecond];
        element.children = children;

        composite = new SVGComposite();
    });

    it('should exits', () => {
        expect(composite).toBeDefined();
    });

    it('should add child', () => {
        const tempSVGPencil = new SVGPencil();
        spyOn(composite.children, 'add');
        composite.addChild(tempSVGPencil);
        expect(composite.children.add).toHaveBeenCalledWith(tempSVGPencil);
    });

    it('should remove child', () => {
        const tempSVGPencil = new SVGPencil();
        spyOn(composite.children, 'delete');
        composite.removeChild(tempSVGPencil);
        expect(composite.children.delete).toHaveBeenCalledWith(tempSVGPencil);
    });

    it('should clear child', () => {
        spyOn(composite.children, 'clear');
        composite.clear();
        expect(composite.children.clear).toHaveBeenCalled();
    });

    it('should return false when isAt is called', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        expect(composite.isAt(x, y)).toBeFalsy();
    });

    it('should return false when isIn is called', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const r = Math.floor(Math.random() * 1000);
        expect(composite.isIn(x, y, r)).toBeFalsy();
    });

    it('should return an empty string when getPrimary is called', () => {
        const tempString = '';
        expect(composite.getPrimary()).toEqual(tempString);
    });

    it('should return an empty string when getSecondary is called', () => {
        const tempString = '';
        expect(composite.getSecondary()).toEqual(tempString);
    });

    it('should return an empty string when getPrimary is called', () => {
        expect((composite as any).isAtAdjusted()).toBeFalsy();
    });

    it('should return an empty string when getSecondary is called', () => {
        const tempNumberArray = vectorPlus([composite.domRect.x, composite.domRect.y],
                    vectorMultiplyConst([composite.domRect.width, composite.domRect.height], 0.5));
        expect(composite.position).toEqual(tempNumberArray);
    });

    it('translate should change children', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempChildren: Set<SVGAbstract> = composite.children;
        for (const child of tempChildren) {
            child.translate(x, y);
        }
        composite.translate(x, y);
        expect(composite.children).toEqual(tempChildren);
    });

    it('translateCommand should return a CmdComposite', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempComposite = new CmdComposite();

        composite.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.translate(x, y);
            tempComposite.addChild(cmd);
        });

        expect(composite.translateCommand(x, y)).toEqual(tempComposite);
    });

    it('rotate should change children', () => {
        const a = Math.floor(Math.random() * 1000);
        const tempChildren: Set<SVGAbstract> = composite.children;
        for (const child of tempChildren) {
            child.rotate(a);
        }
        composite.rotate(a);
        expect(composite.children).toEqual(tempChildren);
    });

    it('rotateCommand should return a CmdComposite', () => {
        const a = Math.floor(Math.random() * 1000);
        const tempComposite = new CmdComposite();

        composite.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.rotate(a);
            tempComposite.addChild(cmd);
        });

        expect(composite.rotateCommand(a)).toEqual(tempComposite);
    });

    it('rescale should change children', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempChildren: Set<SVGAbstract> = composite.children;
        for (const child of tempChildren) {
            child.rescale(x, y);
        }
        composite.rescale(x, y);
        expect(composite.children).toEqual(tempChildren);
    });

    it('rescaleCommand should return a CmdComposite', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempComposite = new CmdComposite();

        composite.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.rescale(x, y);
            tempComposite.addChild(cmd);
        });

        expect(composite.rescaleCommand(x, y)).toEqual(tempComposite);
    });

    it('rescaleOnPointCommand should return a CmdComposite', () => {
        const tempSVGService = new SVGService();
        const tempSelectorBox = new SelectorBox(tempSVGService);

        expect(composite.rescaleOnPointCommand(tempSelectorBox, event)).toBeTruthy();
    });

    it('rescaleOnPointCommand should return a CmdComposite with isShift = true', () => {
        const tempSVGService = new SVGService();
        const tempSelectorBox = new SelectorBox(tempSVGService);
        event.shiftKey = true;
        expect(composite.rescaleOnPointCommand(tempSelectorBox, event)).toBeTruthy();
    });

    it('rotateOnPointCommand should return a CmdComposite', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const a = Math.floor(Math.random() * 1000);
        const position = [x, y];

        const tempCmd = new CmdComposite();
        tempCmd.addChild(composite.translateCommand(-position[0], -position[1]));
        tempCmd.addChild(composite.rotateCommand(a));
        tempCmd.addChild(composite.translateCommand(position[0], position[1]));

        expect(composite.rotateOnPointCommand(a, position, false)).toEqual(tempCmd);
    });

    it('rotateOnPointCommand should return a CmdComposite when onShift is true', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const a = Math.floor(Math.random() * 1000);
        const position = [x, y];

        expect(composite.rotateOnPointCommand(a, position, true)).toEqual((composite as any).rotateOnChildren(a));
    });

    it('rotateOnChildren should return a CmdComposite when onShift is true', () => {
        const a = Math.floor(Math.random() * 1000);
        const tempCmd = new CmdComposite();
        composite.children.forEach((child: SVGAbstract) => {
            const pos: number[] = child.position;
            const transformCmd = new CmdTransform(child);
            transformCmd.translate(-pos[0], -pos[1]);
            transformCmd.rotate(a);
            transformCmd.translate(pos[0], pos[1]);
            tempCmd.addChild(transformCmd);
        });
        expect((composite as any).rotateOnChildren(a)).toEqual(tempCmd);
    });

});
