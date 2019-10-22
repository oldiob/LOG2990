import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGStamp } from '../svg.stamp';
import { EmojiStamp } from './emoji';

describe('EmojiStamp', () => {

    let emoji: EmojiStamp;
    let stamp: SVGStamp;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        stamp = jasmine.createSpyObj('SVGStamp', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        emoji = new EmojiStamp();
    });

    it('should exists', () => {
        expect(emoji).toBeTruthy();
    });

    it('should create emoji element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        emoji.create(stamp);
        expect(stamp.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
    });

    it('should add point to a stamp element', () => {
        emoji.addPoint(stamp, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(6);
    });
});
