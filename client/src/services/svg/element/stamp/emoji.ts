import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGStamp } from '../svg.stamp';
import { IStamp } from './i-stamp';

export class EmojiStamp implements IStamp {

    create(stamp: SVGStamp): void {
        stamp.element = DOMRenderer.createElement('g', 'svg');
    }
    addPoint(stamp: SVGStamp, x: number, y: number): void {
        const centerX = (x - stamp.lineWidth / 2).toString();
        const centerY = (y - stamp.lineWidth / 2).toString();

        const img = DOMRenderer.createElement('image', 'svg');
        DOMRenderer.setAttribute(img, 'x', centerX);
        DOMRenderer.setAttribute(img, 'y', centerY);
        DOMRenderer.setAttribute(img, 'width',  stamp.lineWidth.toString());
        DOMRenderer.setAttribute(img, 'height',  stamp.lineWidth.toString());
        DOMRenderer.setAttribute(img, 'href', `${stamp.imagePaths}`);
        DOMRenderer.setAttribute(img, 'transform', `rotate(${stamp.angles} ${x} ${y})` );
        DOMRenderer.appendChild(stamp.element, img);
    }

}
