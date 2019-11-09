import { TestBed } from '@angular/core/testing';
import { KeyService } from 'src/services/key/key.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGText } from 'src/services/svg/element/svg.text';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { TextTool } from './text';

describe('TextTool', () => {

    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    let keyService: KeyService;
    let paletteService: PaletteService;
    let text: TextTool;
    let event: MouseEvent;
    let element: SVGText;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        DOMRenderer.renderer = renderer;
        keyService = TestBed.get(KeyService);
        paletteService = TestBed.get(PaletteService);
        element = jasmine.createSpyObj('SVGText', ['currentSubElement', 'setPrimary', 'setLineBreak', 'setCurrentPlaceholder']);
        text = new TextTool(keyService, paletteService);
        text.element = element;
        event = new MouseEvent('mousedown');
    });

    it('should create', () => {
        expect(text).toBeTruthy();
    });

    it('should create text field', () => {
        expect(text.onPressed(event)).toBeNull();
    });

    it('should return undefined onMotion', () => {
        expect(text.onMotion(event)).toBeUndefined();
    });

    it('should return undefined onReleased', () => {
        expect(text.onReleased(event)).toBeUndefined();
    });

    it('should set element text to null when it select an another tool', () => {
        text.onUnSelect();
        expect(text.element).toEqual(null);
    });

    it('should return true if a keydown', () => {
        const testText: object = {
            key: 'Rebase',
        };
        text.onKeydown(testText as KeyboardEvent);
        expect(text.onKeydown(testText as KeyboardEvent)).toBeTruthy();
    });

    it('should return Enter if a keydown', () => {
        const enter = new KeyboardEvent('keydown', { key: 'Enter' });
        text.onKeydown(enter);
        expect(text.onKeydown(enter)).toBeTruthy();
    });

    it('should finish editing', () => {
        spyOn(keyService, 'enableShortcut');
        text.finishEdit();
        expect(text.isEditing).toBeFalsy();
        expect(keyService.enableShortcut).toHaveBeenCalled();
        expect(text.element).toBeNull();
    });

    it('should start editing', () => {
        spyOn(keyService, 'disableShortcut');
        text.startEdit();
        expect(text.isEditing).toBeTruthy();
        expect(keyService.disableShortcut).toHaveBeenCalled();
    });

    it('should return true if the line is empty', () => {
        const emptyString = '';
        expect(text.isLineEmpty(emptyString)).toBeTruthy();
    });

    it('should return false if the line is not empty', () => {
        const content = 'Test';
        expect(text.isLineEmpty(content)).toBeFalsy();
    });

    it('should show a preview of text', () => {
        text.onShowcase(event.svgX, event.svgY);
        expect(text.onShowcase(event.svgX, event.svgY)).toBeNull();
    });
});
