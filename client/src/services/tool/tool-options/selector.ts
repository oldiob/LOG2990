import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmdComposite } from 'src/services/cmd/cmd.array';
import { CmdDup } from 'src/services/cmd/cmd.dup';
import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { CmdInterface, CmdService } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGComposite } from 'src/services/svg/element/svg.composite';
import { SVGService } from 'src/services/svg/svg.service';
import { SelectorBox, SelectorState } from 'src/services/tool/tool-options/selector-box';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Rect } from 'src/utils/geo-primitives';
import { vectorMinus, vectorMultiplyConst, vectorPlus, vectorModule } from 'src/utils/math';
import { ITool } from './i-tool';

declare type callback = () => void;

@Injectable({
    providedIn: 'root',
})
export class SelectorTool implements ITool {

    static BASE_OFFSET = 30;
    private firstMousePosition: number[];
    private currentMousePosition: number[];
    private selectorBox: SelectorBox;
    private preview: SVGRectElement;
    private mIsSelected: boolean;
    private isSelectedSubject = new BehaviorSubject<boolean>(this.isSelected);
    private dupOffset: number[] = [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET];
    private state: SelectorState = SelectorState.NONE;
    private transforms: CmdComposite | null;
    readonly tip = 'Selector (S)';

    private selectedBeforeUnselect: Set<SVGAbstract>;
    selected: SVGComposite;
    private unselected: SVGComposite;

    distanceToCenter: number[];

    private readonly MAX_DISTANCE_FOR_CLICK = 5;
    private isSingleClick: boolean;
    private distanceMoved: number;

    constructor(private svg: SVGService) {

        this.isSingleClick = false;
        this.distanceMoved = 0;

        this.firstMousePosition = [0, 0];
        this.currentMousePosition = [0, 0];
        this.distanceToCenter = [];

        this.selectedBeforeUnselect = new Set<SVGAbstract>();
        this.selected = new SVGComposite();
        this.unselected = new SVGComposite();

        this.selectorBox = new SelectorBox(svg);

        this.preview = DOMRenderer.createElement('rect', 'svg', {
            'fill-opacity': '0',
            'stroke-opacity': '0.8',
            stroke: '#2188ff',
            'stroke-width': '1',
            'stroke-dasharray': '4',
        });
    }

    private set isSelected(isSelected: boolean) {
        this.mIsSelected = isSelected;
        this.isSelectedSubject.next(this.mIsSelected);
    }

    get isSelectedObservable(): Observable<boolean> {
        return this.isSelectedSubject.asObservable();
    }

    onPressed(event: MouseEvent): CmdInterface | null {
        this.isSingleClick = true;
        this.distanceMoved = 0;

        this.firstMousePosition = [event.svgX, event.svgY];
        this.currentMousePosition = [event.svgX, event.svgY];

        this.showPreview();

        switch (event.button) {
            case 0:
                this.onLeftClick(event.svgX, event.svgY);
                break;

            case 2:
                this.selectedBeforeUnselect.clear();
                this.selected.children.forEach((child) => {
                    this.selectedBeforeUnselect.add(child);
                });
                this.state = SelectorState.UNSELECTING;
                break;

            default:
                break;
        }

        this.transforms = new CmdComposite();
        return this.transforms;
    }

    onMotion(event: MouseEvent): void {
        if (this.state === SelectorState.NONE) {
            return;
        }

        const previousMousePosition = [this.currentMousePosition[0], this.currentMousePosition[1]];
        this.currentMousePosition = [event.svgX, event.svgY];

        if (this.isSingleClick) {
            this.distanceMoved += vectorModule(vectorMinus(previousMousePosition, this.currentMousePosition));
            if (this.distanceMoved > this.MAX_DISTANCE_FOR_CLICK) {
                this.isSingleClick = false;
            }
        }

        switch (this.state) {
            case SelectorState.SELECTING:
                this.showPreview();
                this.select();
                break;
            case SelectorState.UNSELECTING:
                this.showPreview();
                this.unselect();
                break;
            case SelectorState.MOVING:
                if (this.transforms) {
                    const toMove = vectorMinus(this.currentMousePosition, previousMousePosition);
                    this.transforms.addChild(
                        this.selected.translateCommand(toMove[0], toMove[1]));
                    this.updateSelect();
                }
                break;
            case SelectorState.SCALING:
                if (this.transforms) {
                    this.transforms.addChild(
                        this.selected.rescaleOnPointCommand(this.selectorBox, event));
                    this.updateSelect();
                }
                break;
            default:
                break;
        }
    }

    private showPreview(): void {
        this.hidePreview();

        DOMRenderer.setAttributes(this.preview, {
            x: Math.min(this.firstMousePosition[0], this.currentMousePosition[0]).toString(),
            y: Math.min(this.firstMousePosition[1], this.currentMousePosition[1]).toString(),
            width: Math.abs(this.firstMousePosition[0] - this.currentMousePosition[0]).toString(),
            height: Math.abs(this.firstMousePosition[1] - this.currentMousePosition[1]).toString(),
        });

        this.svg.addElement(this.preview);
    }

    private hidePreview(): void {
        this.svg.removeElement(this.preview);
    }

    private onLeftClick(x: number, y: number): void {
        const previewState: SelectorState = this.selectorBox.onPressed(x, y);

        if (previewState !== SelectorState.NONE) {
            this.state = previewState;
            return;
        }

        if (this.isEmpty()) {
            this.selectTargeted();
        } else {
            this.clearSelection();
        }

        this.state = SelectorState.SELECTING;
    }

    private onRightClick() {
        this.unselected.clear();
        this.selected.children.forEach((child) => {
            this.unselected.addChild(child);
        });
        this.selectAll();

        for (const child of this.unselected.children) {
            this.selected.children.delete(child);
        }
        this.updateSelect();
    }

    private selectTargeted(): void {
        this.selected.clear();
        const elementAt: SVGAbstract | null = this.svg.findAt(this.firstMousePosition[0], this.firstMousePosition[1]);

        if (elementAt) {
            this.selected.addChild(elementAt);
        }

        this.isSelected = !this.isEmpty();
        this.updateSelect();
    }

    private select(): void {
        const rect: Rect = new Rect(
            Math.min(this.firstMousePosition[0], this.currentMousePosition[0]),
            Math.min(this.firstMousePosition[1], this.currentMousePosition[1]),
            Math.max(this.firstMousePosition[0], this.currentMousePosition[0]),
            Math.max(this.firstMousePosition[1], this.currentMousePosition[1]));

        this.selected.clear();
        const elementsInRect: Set<SVGAbstract> = this.svg.getInRect(rect);

        elementsInRect.forEach((element) => {
            this.selected.addChild(element);
        });

        this.isSelected = !this.isEmpty();
        this.updateSelect();
    }

    private unselect(): void {
        const rect: Rect = new Rect(
            this.firstMousePosition[0],
            this.firstMousePosition[1],
            this.currentMousePosition[0],
            this.currentMousePosition[1]);

        const elementsInRect: Set<SVGAbstract> = this.svg.getInRect(rect);

        elementsInRect.forEach((element: SVGAbstract) => {
            this.unselected.addChild(element);
            this.selected.children.delete(element);
        });

        this.unselected.children.forEach((element: SVGAbstract) => {
            if (!elementsInRect.has(element) && this.selectedBeforeUnselect.has(element)) {
                this.unselected.children.delete(element);
                this.selected.addChild(element);
            }
        });

        this.updateSelect();
    }

    private updateSelect(): void {
        if (this.isEmpty()) {
            this.selectorBox.hideBox();
        } else {
            this.selectorBox.setBox(this.selected.domRect);
        }
    }

    private isEmpty(): boolean {
        return this.selected.children.size === 0;
    }

    clearSelection(): void {
        this.state = SelectorState.NONE;
        this.selected.clear();
        this.selectorBox.hideBox();
        this.isSelected = false;
    }

    onWheel(event: WheelEvent): boolean {
        const angle = Math.sign(event.deltaY) * (Math.PI / 180) * (event.altKey ? 1 : 15);

        if (!this.isEmpty() && this.transforms && this.state === SelectorState.NONE) {
            const center: number[] = this.selected.position;
            this.transforms.addChild(
                this.selected.rotateOnPointCommand(angle, center, event.shiftKey));
            this.updateSelect();
        }

        return true;
    }

    onReleased(event: MouseEvent): void {

        if (this.state === SelectorState.UNSELECTING && this.isSingleClick) {
            this.onRightClick();
        }

        this.state = SelectorState.NONE;
        this.hidePreview();
    }

    onKeydown(event: KeyboardEvent): boolean {
        const kbd: { [id: string]: callback } = {
            'C-a': () => this.selectAll(),
            'C-d': () => this.duplicate(),
            delete: () => this.erase(),

        };
        let keys = '';
        if (event.ctrlKey) {
            keys += 'C-';
        }
        keys += event.key.toLowerCase();
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
            return true;
        }
        return false;
    }

    selectAll(): void {
        const tempFirst = this.firstMousePosition;
        const tempLast = this.currentMousePosition;

        this.firstMousePosition = [0, 0];
        this.currentMousePosition = [Infinity, Infinity];

        this.select();

        this.firstMousePosition = tempFirst;
        this.currentMousePosition = tempLast;

        this.state = SelectorState.NONE;
    }

    duplicate(): void {
        this.dupOffset = this.nextOffset(this.dupOffset);
        CmdService.execute(new CmdDup(Array.from(this.selected.children), this.dupOffset));
    }

    erase(): void {
        const cmd: CmdEraser = new CmdEraser();
        this.selected.children.forEach((obj) => {
            cmd.eraseObject(obj);
        });
        CmdService.execute(cmd);
        this.clearSelection();
    }

    nextOffset(currentOffset: number[]): number[] {
        const newOffset: number[] = vectorPlus(currentOffset, [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET]);
        let finalOffset: number[];

        let outsideState = 0;

        const currentXSteps = newOffset[0] / SelectorTool.BASE_OFFSET;
        const currentYSteps = newOffset[1] / SelectorTool.BASE_OFFSET;

        const baseHorizontalSteps = currentXSteps - currentYSteps;

        this.selected.translate(newOffset[0], newOffset[1]);
        const state = this.elementState(this.selected);
        if (outsideState !== 0) {
            outsideState = Math.min(outsideState, state);
        } else {
            outsideState = state;
        }
        this.selected.translate(-newOffset[0], -newOffset[1]);

        switch (outsideState) {
            case 1:
                finalOffset = vectorMultiplyConst([-1, -1], SelectorTool.BASE_OFFSET);
                break;
            case 2:
                finalOffset = vectorMultiplyConst([baseHorizontalSteps + 1, 0], SelectorTool.BASE_OFFSET);
                break;
            default:
                finalOffset = newOffset;
        }

        return finalOffset;
    }

    private elementState(element: SVGAbstract): number {
        const rect: DOMRect = element.domRect;
        const entryPositions: DOMRect = this.svg.entry.nativeElement.getBoundingClientRect();

        const right = rect.right - entryPositions.left;
        const bottom = rect.bottom - entryPositions.top;

        let currentState = 0;
        if (right > entryPositions.right) {
            currentState = 1;
        } else if (bottom > entryPositions.bottom) {
            currentState = 2;
        }

        return currentState;
    }

    onUnSelect(): void {
        this.hidePreview();
        this.clearSelection();
    }

    onSelect(): void {
        this.hidePreview();
        this.clearSelection();
    }

    onShowcase(): null {
        return null;
    }
}
