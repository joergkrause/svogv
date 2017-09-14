import { IHudClockStrokeOption } from './hud-clock-strokeoption';

export class HudClockOptions {
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
    };
    hour: IHudClockStrokeOption;
    minute: IHudClockStrokeOption;
    second: IHudClockStrokeOption;
    milli: IHudClockStrokeOption;
}