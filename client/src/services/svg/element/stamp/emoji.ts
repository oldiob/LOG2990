import { SVGStamp } from '../svg.stamp';
import { IStamp } from './i-stamp';

export class EmojiStamp implements IStamp {

    create(stamp: SVGStamp): void {
        stamp.element = stamp.renderer.createElement('g', 'svg');
    }
    addPoint(stamp: SVGStamp, x: number, y: number): void {
        const img = stamp.renderer.createElement('image', 'svg');
        stamp.renderer.setAttribute(img, 'x', x.toString());
        stamp.renderer.setAttribute(img, 'y', y.toString());
        stamp.renderer.setAttribute(img, 'width',  stamp.lineWidth.toString());
        stamp.renderer.setAttribute(img, 'height',  stamp.lineWidth.toString());
        stamp.renderer.setAttribute(img, 'href', `${stamp.imagePaths}`);
        stamp.renderer.setAttribute(img, 'transform', `rotate(${stamp.angles} ${x} ${y})` );
        stamp.renderer.appendChild(stamp.element, img);
    }

}
