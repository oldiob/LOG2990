import { SVGStamp } from '../svg.stamp';
import { IStamp } from './i-stamp';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

export class EmojiStamp implements IStamp {

    create(stamp: SVGStamp): void {
        stamp.element = RendererProvider.renderer.createElement('g', 'svg');
    }
    addPoint(stamp: SVGStamp, x: number, y: number): void {
        const centerX = (x - stamp.lineWidth / 2).toString();
        const centerY = (y - stamp.lineWidth / 2).toString();

        const img = RendererProvider.renderer.createElement('image', 'svg');
        RendererProvider.renderer.setAttribute(img, 'x', centerX);
        RendererProvider.renderer.setAttribute(img, 'y', centerY);
        RendererProvider.renderer.setAttribute(img, 'width',  stamp.lineWidth.toString());
        RendererProvider.renderer.setAttribute(img, 'height',  stamp.lineWidth.toString());
        RendererProvider.renderer.setAttribute(img, 'href', `${stamp.imagePaths}`);
        RendererProvider.renderer.setAttribute(img, 'transform', `rotate(${stamp.angles} ${x} ${y})` );
        RendererProvider.renderer.appendChild(stamp.element, img);
    }

}
