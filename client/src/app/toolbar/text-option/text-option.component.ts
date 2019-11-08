import { Component, OnInit, ViewChild } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { TextTool } from 'src/services/tool/tool-options/text';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { WidthComponent } from '../width/width.component';

export enum FontFamilyValue {
    Arial = 0,
    TimesNewRoman = 1,
    LucidaConsole = 2,
    Verdana = 3,
    Garamond = 4,
    ComicSansMS = 5,
    LucidaSansUnicode = 6,
    Tahoma = 7,
    Courier = 8,
    TrebuchetMS = 9,
    Palatino = 10,
}

export enum FontFamilyType {
    Arial = 'Arial',
    TimesNewRoman = 'Times New Roman',
    LucidaConsole = 'Lucida Console',
    Verdana = 'Verdana',
    Garamond = 'Garamond',
    ComicSansMS = 'Comic Sans MS',
    LucidaSansUnicode = 'Lucida Sans Unicode',
    Tahoma = 'Tahoma',
    Courier = 'Courier',
    TrebuchetMS = 'Trebuchet MS',
    Palatino = 'Palatino Linotype',
}
@Component({
    selector: 'app-text-option',
    templateUrl: './text-option.component.html',
    styleUrls: ['./text-option.component.scss', '../toolbar-option.scss'],
})

export class TextOptionComponent implements OnInit, IOption<ITool> {

    private readonly FILE_LOCATION = '../../../../assets/images/';
    EMPTYSTRING = '';
    DEFAULT_SIZE = '15px';
    BOLD = 'bold';
    NORMAL = 'normal';
    ITALIC = 'italic';
    ALIGNLEFT = 'start';
    ALIGNCENTER = 'middle';
    ALIGNRIGHT = 'end';
    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    @ViewChild(WidthComponent, { static: true })
    widthComponent: WidthComponent;

    tip = 'Text (T)';
    images = new Map<ITool, string>([
        [this.text, 'text.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isBold = false;
    isItalic = false;
    isAlignLeft = true;
    isAlignCenter = false;
    isAlignRight = false;

    currentFontFamily: string;

    fontFamilies: any[];

    constructor(private toolService: ToolService, private text: TextTool) {

        this.tools = [text];
        this.currentTool = this.tools[0];

        this.fontFamilies = [] = [
            { value: FontFamilyValue.Arial, fontFamily: FontFamilyType.Arial },
            { value: FontFamilyValue.TimesNewRoman, fontFamily: FontFamilyType.TimesNewRoman },
            { value: FontFamilyValue.LucidaConsole, fontFamily: FontFamilyType.LucidaConsole },
            { value: FontFamilyValue.Verdana, fontFamily: FontFamilyType.Verdana },
            { value: FontFamilyValue.Garamond, fontFamily: FontFamilyType.Garamond },
            { value: FontFamilyValue.ComicSansMS, fontFamily: FontFamilyType.ComicSansMS },
            { value: FontFamilyValue.LucidaSansUnicode, fontFamily: FontFamilyType.LucidaSansUnicode },
            { value: FontFamilyValue.Tahoma, fontFamily: FontFamilyType.Tahoma },
            { value: FontFamilyValue.Courier, fontFamily: FontFamilyType.Courier },
            { value: FontFamilyValue.TrebuchetMS, fontFamily: FontFamilyType.TrebuchetMS},
            { value: FontFamilyValue.Palatino, fontFamily: FontFamilyType.Palatino },
        ];
        this.currentFontFamily = this.EMPTYSTRING;
    }

    ngOnInit() {
        this.currentTool = this.text;
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
        this.showcase.display(this.currentTool);
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    selectFontSize(fontSize: string): void {
        this.text.fontSize = fontSize;
        if (this.text.element !== null) {
            this.text.element.setFontSize(fontSize);
        }
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.fontFamily = this.currentFontFamily;
        if (this.text.element !== null) {
            this.text.element.setFontFamily(fontFamily);
        }
    }

    selectTextAlign(textAlign: string): void {
        this.disableAlign();
        if (textAlign === this.ALIGNLEFT) {
            this.isAlignLeft = true;
        } else if (textAlign === this.ALIGNCENTER) {
            this.isAlignCenter = true;
        } else if (textAlign === this.ALIGNRIGHT) {
            this.isAlignRight = true;
        }
        if (this.text.element !== null) {
            this.text.element.setTextAlign(textAlign);
        }
    }

    disableAlign() {
        this.isAlignLeft = false;
        this.isAlignCenter = false;
        this.isAlignRight = false;
    }

    toggleBold() {
        this.isBold = !this.isBold;
        if (this.text.element !== null) {
            if (this.isBold) {
                this.text.element.setFontWeight(this.BOLD);
                this.text.fontWeigth = this.BOLD;
            } else {
                this.text.element.setFontWeight(this.NORMAL);
                this.text.fontWeigth = this.NORMAL;
            }
        }
    }

    toggleItalic() {
        this.isItalic = !this.isItalic;
        if (this.text.element !== null) {
            if (this.isItalic) {
                this.text.element.setFontStyle(this.ITALIC);
                this.text.fontStyle = this.ITALIC;
            } else {
                this.text.element.setFontStyle(this.NORMAL);
                this.text.fontStyle = this.NORMAL;
            }
        }
    }
}
