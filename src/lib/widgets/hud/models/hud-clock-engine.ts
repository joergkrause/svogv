import { ElementRef } from '@angular/core';

import { IHudClockStrokeOption } from './hud-clock-strokeoption';
import { HudClockOptions } from './hud-clock-options';
import { WindowRef } from '../../../utils/windowref';

import { CanvasElementRef } from '../types/hud-types';

export class HudClockEngine {

    private canvas: HTMLCanvasElement;
    private engine: CanvasRenderingContext2D;
    private frame: FrameRequestCallback | any;
    private star: Array<{
        width: number,
        deg: number,
        color: number,
        colorDir: number
    }>;
    private size: number;
    private radius: number;
    private current: Date;
    private meta: {
        width: number,
        height: number,
        size: number,
        radius: number,
        middle: { x: number, y: number }
    };
    private fps: {
        val: number,
        refresh: number,
        tick: number,
        start: Date
    };

    constructor(canvasElement: CanvasElementRef, window: WindowRef, public config: HudClockOptions) {
        this.canvas = <HTMLCanvasElement>canvasElement.nativeElement;
        this.engine = this.canvas.getContext('2d');
        // get the window the canvas lives in
        this.frame = window.nativeWindow.requestAnimationFrame
            || window.nativeWindow.webkitRequestAnimationFrame
            || function (cb: any) { return setTimeout(cb, 30); };
        this.star = new Array<{
            width: number,
            deg: number,
            color: number,
            colorDir: number
        }>();
        this.size = 0.9;
        this.radius = this.size / 2;
        var current = null;
        this.fps = {
            val: 0,
            refresh: 50,
            tick: 0,
            start: new Date()
        };
        this.meta = {
            width: 0,
            height: 0,
            size: 0,
            radius: 0,
            middle: {
                x: 0,
                y: 0
            }
        };
    }

    /**
     * init
     */
    run() {
        this.generateStar();

        this.canvas.setAttribute('width', `${this.config.width.toString()}px`);
        this.canvas.setAttribute('height', `${this.config.height.toString()}px`);

        this.frame(this.tick);
    }

    /**
     * render frame callback, invocation avoids closure per frame
     */
    tick = () => {
        this.current = new Date();
        this.solveMeta();

        this.engine.fillStyle = '#000';
        this.engine.clearRect(0, 0, this.meta.width, this.meta.height);
        this.engine.fillRect(0, 0, this.meta.width, this.meta.height);

        // draw part
        this.drawFps();
        this.drawStar();
        this.drawBackgroundTime();
        this.drawPattern();
        this.drawForegroundTime();

        this.drawDigital();

        this.frame(this.tick);
    }

    /**
     * draw digital watch
     */
    drawDigital() {
        if (this.config.drawDigital) {
            var time = [
                this.n(this.current.getHours()),
                this.current.getSeconds() % 2 ? ':' : ' ', // blinking :
                this.n(this.current.getMinutes())
            ].join('');

            var size = 30;
            var padding = 10;
            this.engine.font = size + 'px Arial';
            var m = this.engine.measureText(time);

            // engine.fillStyle = 'rgba(0,0,0,0.5)';
            // engine.fillRect(
            //    meta.middle.x - m.width / 2 - padding,
            //    meta.middle.y - size / 2 - padding,
            //    m.width + padding * 2,
            //    size + padding * 2
            // );

            this.engine.fillStyle = '#fff';
            this.engine.fillText(
                time,
                this.meta.middle.x - m.width / 2,
                this.meta.middle.y + size / 2
            );
        }
    }

    /**
     * @param ne
     * @returns {*}
     */
    private n(ne: number): string {
        if (ne < 10) {
            return '0' + ne;
        }
        return ne.toString();
    };

    /**
     * draw lines for evers hour and minute
     */
    drawPattern() {
        //#1
        this.engine.strokeStyle = 'rgba(255,255,255,0.2)';
        this.engine.lineWidth = 2;

        this.engine.beginPath();
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, this.meta.radius * 0.8 - this.meta.radius / 12, 0, Math.PI * 2);
        this.engine.stroke();
        this.engine.closePath();

        //#1.5
        this.engine.strokeStyle = 'rgba(255,255,255,0.2)';
        this.engine.beginPath();
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, this.meta.radius * 0.8 + this.meta.radius / 12, 0, Math.PI * 2);
        this.engine.stroke();
        this.engine.closePath();

        //#2
        this.engine.strokeStyle = 'rgba(0,0,0,0.5)';
        this.engine.lineWidth = this.meta.radius / 6;

        this.engine.beginPath();
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, this.meta.radius * 0.8, 0, Math.PI * 2);
        this.engine.stroke();
        this.engine.closePath();


        let angleWidth = Math.PI * 2 / 60;
        let seconds: number = this.current.getSeconds() + this.current.getMilliseconds() / 1000;

        for (let i = 0; i < 60; i++) {
            let angleMid = i * angleWidth - 0.5 * Math.PI;
            let startAngle = angleMid - Math.PI / 500;
            let endAngle = angleMid + Math.PI / 500;

            // var opa = (60 - seconds + i - 1) % 60;
            //
            // engine.strokeStyle = 'rgba(' + [255, 255, 255, opa / 60].join(',') + ')';

            if (i === seconds) {
                this.engine.strokeStyle = '#0a0';
            } else {
                var opa = 1 - Math.min(
                    Math.abs(i - 60 - seconds),
                    Math.abs(i - seconds),
                    Math.abs(i + 60 - seconds)
                ) / 15;

                this.engine.strokeStyle = 'rgba(' + [255, 255, 255, opa].join(',') + ')';
            }


            this.engine.lineWidth = this.meta.radius / 20;

            this.engine.beginPath();
            this.engine.arc(this.meta.middle.x, this.meta.middle.y, this.meta.radius * 0.8, startAngle, endAngle);
            this.engine.stroke();
            this.engine.closePath();
        }

        angleWidth = Math.PI * 2 / 12;

        for (let i = 0; i < 12; i++) {
            let angleMid = i * angleWidth - 0.5 * Math.PI;
            let startAngle = angleMid - Math.PI / 200;
            let endAngle = angleMid + Math.PI / 200;

            this.engine.strokeStyle = 'rgba(255,255,255,0.6)';
            this.engine.lineWidth = this.meta.radius / 7;

            this.engine.beginPath();
            this.engine.arc(this.meta.middle.x, this.meta.middle.y, this.meta.radius * 0.75, startAngle, endAngle);
            this.engine.stroke();
            this.engine.closePath();
        }
    }

    /**
     * draw background clock
     */
    drawBackgroundTime() {
        this.drawBackgroundTimePart(this.meta.radius / 3 + 20, this.current.getHours() + this.current.getMinutes() / 60, 12, this.config.hour);
        this.drawBackgroundTimePart(this.meta.radius * 0.65 + 20, this.current.getMinutes() + this.current.getSeconds() / 60, 60, this.config.minute);
        this.drawBackgroundTimePart(this.meta.radius + 20, this.current.getSeconds() + this.current.getMilliseconds() / 1000, 60, this.config.second);
    };

    /**
     * draw foreground clock
     */
    drawForegroundTime() {
        this.drawTimePart(this.meta.radius / 3, this.current.getHours() + this.current.getMinutes() / 60, 12, this.config.hour);
        this.drawTimePart(this.meta.radius * 0.65, this.current.getMinutes() + this.current.getSeconds() / 60, 60, this.config.minute);
        this.drawTimePart(this.meta.radius, this.current.getSeconds() + this.current.getMilliseconds() / 1000, 60, this.config.second);

        this.drawTimePart(this.meta.radius / 15, this.current.getMilliseconds(), 1000, this.config.milli);
        this.drawTimePart(this.meta.radius / 15, this.current.getMilliseconds() + 250, 1000, this.config.milli);
        this.drawTimePart(this.meta.radius / 15, this.current.getMilliseconds() + 500, 1000, this.config.milli);
        this.drawTimePart(this.meta.radius / 15, this.current.getMilliseconds() + 750, 1000, this.config.milli);
    };

    /**
     * draw bg time part
     *
     * @param {number} radius
     * @param {number} time
     * @param {number} maxTime
     * @param {{}} config
     */
    drawBackgroundTimePart(radius: number, time: number, maxTime: number, configPart: IHudClockStrokeOption) {
        this.engine.globalAlpha = 0.5;

        var angleWidth = Math.PI * 2 / maxTime;
        var angleMid = time * angleWidth - 0.5 * Math.PI;
        var startAngle = angleMid - Math.PI / 1.5;
        var endAngle = angleMid + Math.PI / 1.5;

        this.engine.fillStyle = configPart.background;

        // ### 1
        var grd = this.engine.createRadialGradient(this.meta.middle.x, this.meta.middle.y, radius / 2, this.meta.middle.x, this.meta.middle.y, radius);
        grd.addColorStop(0, 'rgba(0,0,0,0)');
        grd.addColorStop(1, configPart.background);
        this.engine.fillStyle = grd;

        this.engine.beginPath();
        this.engine.moveTo(this.meta.middle.x, this.meta.middle.y);
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, radius, startAngle, endAngle);
        this.engine.fill();
        this.engine.closePath();

        // ### 2
        grd = this.engine.createRadialGradient(this.meta.middle.x, this.meta.middle.y, radius / 2, this.meta.middle.x, this.meta.middle.y, radius);
        grd.addColorStop(0, 'rgba(0,0,0,0)');
        grd.addColorStop(1, 'rgba(0,200,0,0.5)');
        this.engine.fillStyle = grd;

        this.engine.beginPath();
        this.engine.moveTo(this.meta.middle.x, this.meta.middle.y);
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, radius, startAngle + Math.PI / 2, endAngle - Math.PI / 2);
        this.engine.fill();
        this.engine.closePath();

        this.engine.globalAlpha = 1;
    }

    /**
     * draw time part
     *
     * @param {number} radius
     * @param {number} time
     * @param {number} maxTime
     */
    drawTimePart = function (radius: number, time: number, maxTime: number, configPart: IHudClockStrokeOption) {
        var angleWidth: number = Math.PI * 2 / maxTime;
        var angleMid: number = time * angleWidth - 0.5 * Math.PI;
        var length = 8;

        if (this.anti) {
            angleMid = 0 - angleMid;
            length = 8;
        }

        var startAngle = angleMid - Math.PI / length;
        var endAngle = angleMid + Math.PI / length;

        this.engine.strokeStyle = configPart.foreground;
        this.engine.lineWidth = configPart.width;

        this.engine.beginPath();
        this.engine.arc(this.meta.middle.x, this.meta.middle.y, radius - configPart.width, startAngle, endAngle);
        this.engine.stroke();
        this.engine.closePath();


        if (!this.anti) {
            this.engine.strokeStyle = '#fff';
            this.engine.lineWidth = 20;

            this.engine.beginPath();
            this.engine.arc(this.meta.middle.x, this.meta.middle.y, radius, angleMid - 0.01, angleMid + 0.01);
            this.engine.stroke();
            this.engine.closePath();
        }
    }

    /**
     * solve and render fps
     */
    drawFps() {
        if (this.config.showBottomTime) {
            this.fps.tick--;
            // measure frames per second for debugging
            if (this.fps.tick <= 0) {
                let diffTime: number = (<any>new Date() - <any>this.fps.start) / 1000;
                this.fps.val = (this.fps.refresh / diffTime * 10) / 10;
                this.fps.start = new Date();
                this.fps.tick = this.fps.refresh;
            }

            this.engine.font = '10px Arial';
            this.engine.fillStyle = '#fff';
            let bottomText = [
                this.n(this.current.getHours()),
                this.current.getSeconds() % 2 ? ':' : ' ',
                this.n(this.current.getMinutes()),
                this.current.getSeconds() % 2 ? ':' : ' ',
                this.n(this.current.getSeconds())
            ].join('');
            let metric = this.engine.measureText(bottomText);
            this.engine.fillText(bottomText, (this.meta.width / 2) - (metric.width / 2), this.meta.height - 5);
        }
    }

    /**
     * generate Star line setup
     */
    generateStar() {
        for (var i = 0; i < this.config.starCount; i++) {
            this.star.push({
                width: Math.random(),
                deg: Math.random() * 360,
                color: Math.random(),
                colorDir: Math.random() < 0.5 ? this.config.star.fadeSpeed : -this.config.star.fadeSpeed
            });
        }
    }

    /**
     * height of canvas
     * @returns {string}
     */
    get width(): number {
        return parseInt(this.canvas.getAttribute('width'));
    }

    /**
     * height of canvas
     * @returns {string}
     */
    get height(): number {
        return parseInt(this.canvas.getAttribute('height'));
    }

    /**
     * get mid coords from the clock
     * @returns {{x: number, y: number}}
     */
    get middle() {
        return { x: this.width / 2, y: this.height / 2 };
    }

    /**
     * cache size properties
     */
    solveMeta() {
        this.meta.width = this.width;
        this.meta.height = this.height;
        this.meta.radius = Math.min(this.meta.width, this.meta.height) * this.radius;
        this.meta.size = Math.min(this.meta.width, this.meta.height);
        this.meta.middle = this.middle;
    }

    /**
     * draw clock star lines
     */
    drawStar() {
        this.engine.strokeStyle = this.config.star.color;

        for (var i = 0; i < this.star.length; i++) {
            var starLine = this.star[i];
            var relX = Math.sin(starLine.deg / 360 * Math.PI * 2);
            var relY = Math.cos(starLine.deg / 360 * Math.PI * 2);

            this.engine.beginPath();

            this.engine.moveTo(
                this.meta.middle.x,
                this.meta.middle.y
            );

            this.engine.lineTo(
                this.meta.middle.x + relX * starLine.width * this.meta.radius,
                this.meta.middle.y + relY * starLine.width * this.meta.radius
            );

            this.engine.lineWidth = (1 - starLine.width) * 5;

            if (this.config.star.fade) {
                this.engine.globalAlpha = this.config.star.minOpacity + (1 - this.config.star.minOpacity) * starLine.color;
                starLine.color += starLine.colorDir;

                if (starLine.color >= 1 || starLine.color <= 0) {
                    starLine.color = starLine.color | 0;
                    starLine.colorDir = -starLine.colorDir;
                }
            }

            this.engine.stroke();
            this.engine.closePath();
        }

        this.engine.globalAlpha = 1;
    }
};