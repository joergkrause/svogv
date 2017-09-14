import {
    Component, Inject,
    Input, Output,
    EventEmitter,
    AfterViewInit, ViewChild, Renderer
} from '@angular/core';
import { HudClockEngine } from './models/hud-clock-engine';
import { HudClockOptions } from './models/hud-clock-options';
import { WindowRef } from '../../utils/windowref';

import { CanvasElementRef } from './types/hud-types';

/**
 * Fancy HUD analog clock, animated.
 */
@Component({
    selector: 'hud-clock',
    styles: [`canvas#hud-clock {margin:0 auto;display:block;width:200px;height:200px}`],
    template: `<canvas id="hud-clock" #clockCanvas></canvas>`
})
export class HudClock implements AfterViewInit {

    @Input() width: number;
    @Input() height: number;
    @Input() config: EventEmitter<HudClockOptions>;
    @Output() minuteClock: EventEmitter<Date>;
    @Output() hourClock: EventEmitter<Date>;
    @ViewChild('clockCanvas') canvas: CanvasElementRef;

    constructor(private rd: Renderer, @Inject(WindowRef) private window: WindowRef) {
        this.minuteClock = new EventEmitter<Date>();
        this.hourClock = new EventEmitter<Date>();
        // assume pixel
        this.width = 200;
        this.height = 200;
    }

    private clock: HudClockEngine;

    ngAfterViewInit() {
        let initialConfig = {
            width: this.width,
            height: this.height,
            starCount: 500,
            showBottomTime: true,
            drawDigital: true,
            star: {
                minOpacity: 0.1,
                fade: true,
                fadeSpeed: 0.02,
                color: '#0a0'
            },
            hour: {
                foreground: '#aaa',
                background: '#000',
                width: 3,
            },
            minute: {
                foreground: '#aaa',
                background: '#000',
                width: 3,
            },
            second: {
                foreground: '#aaa',
                background: '#000',
                width: 3,
            },
            milli: {
                foreground: 'rgba(0,0,0,0.1)',
                background: '#000',
                width: 3,
            }
        };
        if (!this.config) {
            this.config = new EventEmitter<HudClockOptions>();
            this.config.emit(initialConfig);
            this.config.subscribe((newConfig: HudClockOptions) => {
                this.clock.config = newConfig;
                this.clock.run();
            });
        }
        this.clock = new HudClockEngine(this.canvas, this.window, initialConfig);
        this.clock.run();
    }

}

