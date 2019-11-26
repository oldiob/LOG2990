import { Component, OnInit } from '@angular/core';
import { EmojiStamp } from 'src/services/svg/element/stamp/emoji';
import { Base64, IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

@Component({
    selector: 'app-stamp',
    templateUrl: './stamp.component.html',
    styleUrls: ['./stamp.component.scss', '../../toolbar-option.scss'],
})
export class StampComponent implements OnInit {

    Base64 = Base64;
    readonly imageStamp = [] = [
        { png: './assets/images/emojis/angel.png', base64: Base64.ANGEL },
        { png: './assets/images/emojis/angry.png', base64: Base64.ANGRY },
        { png: './assets/images/emojis/cool-1.png', base64: Base64.COOL },
        { png: './assets/images/emojis/crying-1.png', base64: Base64.CRY },
        { png: './assets/images/emojis/kiss-1.png', base64: Base64.KISS },
        { png: './assets/images/emojis/laughing-1.png', base64: Base64.LAUGH },
        { png: './assets/images/emojis/shocked.png', base64: Base64.SHOCKED },
        { png: './assets/images/emojis/sick.png', base64: Base64.SICK },
    ];

    stamps: IStamp[];
    currentStamp: IStamp;

    constructor(private toolService: ToolService) {
        this.stamps = [new EmojiStamp()];
        this.currentStamp = this.stamps[0];
    }

    ngOnInit() {
        //
    }

    selectStamp(image: string): void {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof StampTool) {
            currentTool.currentPath = image;
            currentTool.stampTexture = this.currentStamp;
            ShowcaseSignal.emit();
        }
    }
}
