import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { svgToImage } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';
import { ITool } from './i-tool';

export class BucketFillTool implements ITool {
    readonly tip: string = 'Bucket';
    width: number;

    private isLoaded: boolean;
    private imageData: ImageData;
    colorDifferenceTolerance: number;

    constructor() {
        this.width = 0;
        this.isLoaded = false;
        this.colorDifferenceTolerance = 0;
    }

    onPressed(event: MouseEvent): CmdInterface | null {
        if (!this.isLoaded) {
            return null;
        }


        return null;
    }
    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        throw new Error('Method not implemented.');
    }

    onSelect() {
        this.isLoaded = false;

        const createImageData = (svgImage: HTMLImageElement, ctx: CanvasRenderingContext2D): void => {
            ctx.drawImage(svgImage, 0, 0);
            this.imageData = ctx.getImageData(0, 0, svgImage.width, svgImage.height);

            this.isLoaded = true;
        };

        svgToImage(MyInjector.get(SVGService).entry, createImageData);
    }
}
