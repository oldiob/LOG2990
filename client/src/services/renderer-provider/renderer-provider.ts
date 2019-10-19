import { Renderer2, RendererFactory2 } from '@angular/core';

export class RendererProvider {
    static renderer: Renderer2;

    static init(rendererFactory: RendererFactory2) {
        if (this.renderer === undefined) {
            RendererProvider.renderer = rendererFactory.createRenderer(null, null);
        }
    }
}
