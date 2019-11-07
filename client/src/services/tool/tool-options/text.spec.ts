import { TestBed } from '@angular/core/testing';
import { KeyService } from 'src/services/key/key.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { TextTool } from './text';

describe('TextTool', () => {

    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    let keyService: KeyService;
    let paletteService: PaletteService;
    let text: TextTool;
    let event: MouseEvent;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        DOMRenderer.renderer = renderer;
        keyService = TestBed.get(KeyService);
        paletteService = TestBed.get(PaletteService);
        text = new TextTool(keyService, paletteService);
        event = new MouseEvent('mousedown');
    });

    it('should create', () => {
        expect(text).toBeTruthy();
    });

    it('should return undefined onMotion', () => {
        expect(text.onMotion(event)).toBeUndefined();
    });

    it('should return undefined onReleased', () => {
        expect(text.onReleased(event)).toBeUndefined();
    });

    it('should set font size at 15px', () => {
        const fontSize = '15px';
        text.setFontSize(fontSize);
        if (text.element != null) {
            text.element.setFontSize(fontSize);
        }
        expect(text.fontSize).toEqual(fontSize);
    });

    it('should set font family to arial', () => {
        const fontFamilyArial = 'Arial';
        text.setFontFamily(fontFamilyArial);
        if (text.element != null) {
            text.element.setFontFamily(fontFamilyArial);
        }
        expect(text.fontFamily).toEqual(fontFamilyArial);
    });

    it('should set font style to italic', () => {
        const fontStyleItalic = 'italic';
        text.setFontStyle(fontStyleItalic);
        if (text.element != null) {
            text.element.setFontStyle(fontStyleItalic);
        }
        expect(text.fontStyle).toEqual(fontStyleItalic);
    });

    it('should set font weight to bold', () => {
        const fontWeightBold = 'bold';
        text.setFontWeight(fontWeightBold);
        if (text.element != null) {
            text.element.setFontWeight(fontWeightBold);
        }
        expect(text.fontWeigth).toEqual(fontWeightBold);
    });

    it('should set text align to center', () => {
        const textAlignCenter = 'middle';
        text.setTextAlign(textAlignCenter);
        if (text.element != null) {
        text.element.setTextAlign(textAlignCenter);
        }
        expect(text.textAlign).toEqual(textAlignCenter);
    });

    it('should finish editing', () => {
        spyOn(keyService, 'setIsBlocking');
        text.finishEdit();
        expect(text.isEditing).toBeFalsy();
        expect(keyService.setIsBlocking).toHaveBeenCalledWith(false);
        expect(text.element).toBeNull();
    });

    it('should start editing', () => {
        spyOn(keyService, 'setIsBlocking');
        text.startEdit();
        expect(text.isEditing).toBeTruthy();
        expect(keyService.setIsBlocking).toHaveBeenCalledWith(true);
    });

    it('should return true if the line is empty', () => {
        const emptyString = '';
        expect(text.isLineEmpty(emptyString)).toBeTruthy();
    });

    it('should return false if the line is not empty', () => {
        const content = 'Test';
        expect(text.isLineEmpty(content)).toBeFalsy();
    });
});
