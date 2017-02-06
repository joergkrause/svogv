import { HudClockStrokeOption } from './hud-clock-strokeoption';

export interface HudClockOptions {
    width: number;
    height: number;
    starCount: number;
    showBottomTime: boolean;
    drawDigital: boolean;
    star: {
        minOpacity: number,
        fade: boolean,
        fadeSpeed: number,
        color: string
    },
    hour: HudClockStrokeOption,
    minute: HudClockStrokeOption,
    second: HudClockStrokeOption,
    milli: HudClockStrokeOption
}