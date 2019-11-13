import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGBucketFill } from 'src/services/svg/element/svg.bucket-fill';
import { SVGService } from 'src/services/svg/svg.service';
import { svgToImage } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';
import { ITool } from './i-tool';

export class BucketFillTool implements ITool {
    readonly tip: string = 'Bucket';
    width: number;

    private isLoaded: boolean;
    private imageData: ImageData;
    colorToleranceDelta: number;

    constructor() {
        this.width = 0;
        this.isLoaded = false;
        this.colorToleranceDelta = 0;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (!this.isLoaded) {
            return null;
        }

        const bucketFill = new SVGBucketFill(this.imageData, this.colorToleranceDelta);
        const command = new CmdSVG(bucketFill);
        return command;
    }

    onMotion(event: MouseEvent): void {
        return;
    }

    onReleased(event: MouseEvent): void {
        return;
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
