import { CmdComposite } from 'src/services/cmd/cmd.array';
import { CmdTransform } from 'src/services/cmd/cmd.matrix';
import { SelectorBox } from 'src/services/tool/tool-options/selector-box';
import { vectorDivideVector, vectorMinus, vectorMultiplyConst, vectorMultiplyVector, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGComposite extends SVGAbstract {

    children: Set<SVGAbstract>;

    constructor() {
        super();
        this.children = new Set<SVGAbstract>();
    }

    addChild(child: SVGAbstract) {
        this.children.add(child);
    }

    removeChild(child: SVGAbstract) {
        this.children.delete(child);
    }

    clear() {
        this.children.clear();
    }

    isAt(x: number, y: number): boolean {
        return false;
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        return;
    }
    setSecondary(color: string): void {
        return;
    }
    protected isAtAdjusted(x: number, y: number): boolean {
        return false;
    }

    get position() {
        const rect = this.domRect;

        return vectorPlus([rect.x, rect.y], vectorMultiplyConst([rect.width, rect.height], 0.5));
    }

    translate(x: number, y: number): void {
        for (const child of this.children) {
            child.translate(x, y);
        }
    }

    translateCommand(x: number, y: number): CmdComposite {
        const composite = new CmdComposite();

        this.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.translate(x, y);
            composite.addChild(cmd);
        });

        return composite;
    }

    rotate(angle: number): void {
        for (const child of this.children) {
            child.rotate(angle);
        }
    }

    rotateCommand(angle: number): CmdComposite {
        const composite = new CmdComposite();

        this.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.rotate(angle);
            composite.addChild(cmd);
        });

        return composite;
    }

    rescale(x: number, y: number): void {
        for (const child of this.children) {
            child.rescale(x, y);
        }
    }

    rescaleCommand(x: number, y: number): CmdComposite {
        const composite = new CmdComposite();

        this.children.forEach((child: SVGAbstract) => {
            const cmd = new CmdTransform(child);
            cmd.rescale(x, y);
            composite.addChild(cmd);
        });

        return composite;
    }

    rescaleOnPointCommand(selectorBox: SelectorBox, event: MouseEvent): CmdComposite {
        const MIN_SIZE = 0.1;

        const cmd = new CmdComposite();

        const mousePosition = [event.svgX, event.svgY];
        const isShift: boolean = event.shiftKey;
        const isAlt: boolean = event.altKey;

        const fixedPoint: number[] = isAlt ? this.position : selectorBox.getOppositeAnchorPosition();
        cmd.addChild(this.translateCommand(-fixedPoint[0], -fixedPoint[1]));

        const multiplier: number[] = selectorBox.getScalingMultiplier();
        const movingPoint: number[] = selectorBox.getTargetedAnchorPosition();

        let diff = vectorMinus(mousePosition, movingPoint);
        diff = vectorMultiplyVector(diff, multiplier);

        const deltaNow: number[] = vectorMinus(fixedPoint, movingPoint);
        let deltaToAchieve: number[] = vectorMinus(fixedPoint, vectorPlus(movingPoint, diff));

        const isHorizontal = multiplier[0] !== 0;
        const isVertical = multiplier[1] !== 0;

        if ((isHorizontal && Math.abs(deltaToAchieve[0]) < MIN_SIZE) ||
            (isVertical && Math.abs(deltaToAchieve[1]) < MIN_SIZE)) {
            deltaToAchieve = deltaNow;
        }

        let toScale: number[] = vectorDivideVector(deltaToAchieve, deltaNow);

        if (isShift) {
            const maxToScale = Math.max(Math.abs(toScale[0]), Math.abs(toScale[1]));
            toScale = [Math.sign(toScale[0]) * maxToScale, Math.sign(toScale[1]) * maxToScale];
        }

        cmd.addChild(this.rescaleCommand(
            isHorizontal ? toScale[0] : 1,
            isVertical ? toScale[1] : 1));

        if (toScale[0] < 0) {
            selectorBox.flipHorizontally();
        }
        if (toScale[1] < 0) {
            selectorBox.flipVertically();
        }

        cmd.addChild(this.translateCommand(fixedPoint[0], fixedPoint[1]));

        return cmd;
    }

    rotateOnPointCommand(angle: number, point: number[], isShift: boolean): CmdComposite {
        if (isShift) {
            return this.rotateOnChildren(angle);
        }

        const cmd = new CmdComposite();
        cmd.addChild(this.translateCommand(-point[0], -point[1]));
        cmd.addChild(this.rotateCommand(angle));
        cmd.addChild(this.translateCommand(point[0], point[1]));
        return cmd;
    }

    private rotateOnChildren(angle: number): CmdComposite {
        const cmd = new CmdComposite();
        this.children.forEach((child: SVGAbstract) => {
            const pos: number[] = child.position;
            const transformCmd = new CmdTransform(child);
            transformCmd.translate(-pos[0], -pos[1]);
            transformCmd.rotate(angle);
            transformCmd.translate(pos[0], pos[1]);
            cmd.addChild(transformCmd);
        });
        return cmd;
    }

    get domRect(): DOMRect {
        const xRange = [Infinity, -Infinity];
        const yRange = [Infinity, -Infinity];
        this.children.forEach((child: SVGAbstract) => {
            const rect: DOMRect = child.domRect;

            xRange[0] = Math.min(xRange[0], rect.x);
            yRange[0] = Math.min(yRange[0], rect.y);
            xRange[1] = Math.max(xRange[1], rect.x + rect.width);
            yRange[1] = Math.max(yRange[1], rect.y + rect.height);
        });

        return new DOMRect(xRange[0], yRange[0], xRange[1] - xRange[0], yRange[1] - yRange[0]);
    }

}
