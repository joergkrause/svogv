import {
    Component, Inject,
    Input, Output,
    EventEmitter,
    AfterViewInit, OnChanges, ViewChild, ElementRef, Renderer
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/**
 * A simple round analog clock based on SVG and JavaScript for animation.
 */
@Component({
    selector: 'ac-analogclock',
    styles: [`svg { display: block; }`],
    templateUrl: './ac-analogclock.component.html'
})
export class AcAnalogClock implements AfterViewInit, OnChanges {

    /**
     * The background color of the clock's body.
     */
    @Input() bgColor: string;
    /**
     * The color of the second arrow.
     */
    @Input() secondColor = '#C1EFED';
    /**
     * The color of the minute arrow.
     */
    @Input() minuteColor = '#fdfdfd';
    /**
     * The color of the hour arrow.
     */
    @Input() hourColor = '#fffbf9';
    /**
     * The diameter of tje clock in pixels.
     */
    @Input() diameter: number;
    /**
     * Whether to show seconds or not. This does not affect the timer.
     */
    @Input() showSeconds: boolean;
    /**
     * An event fired every minute.
     */
    @Output() minuteClock: EventEmitter<Date>;
    /**
     * An event fired every hour.
     */
    @Output() hourClock: EventEmitter<Date>;

    @ViewChild('hourhandTransform') hourhandTransform: ElementRef;
    @ViewChild('minutehandTransform') minutehandTransform: ElementRef;
    @ViewChild('secondhandTransform') secondhandTransform: ElementRef;
    @ViewChild('svg') svg: ElementRef;

    constructor(private rd: Renderer, @Inject(DOCUMENT) private document: HTMLDocument) {
        this.minuteClock = new EventEmitter<Date>();
        this.hourClock = new EventEmitter<Date>();
        this.bgColor = '#92345';
        this.diameter = 100;
    }

    ngOnChanges(changes: any) {
        if (changes['diameter']) {
            this.makeMarks();
        }
    }

    ngAfterViewInit() {
        this.makeMarks();
        // create animation string
        let shifter = (val: number) => [val, this.diameter, this.diameter].join(' ');
        // // from real time
        let date = new Date();
        var secAngle: number = 360 * date.getSeconds() / 60;
        var minuteAngle: number = 360 * date.getMinutes() / 60;
        var hoursAngle: number = 360 * date.getHours() / 12 + date.getMinutes() / 2;
        // // assign animation flow
        this.setRotate(this.secondhandTransform, shifter(secAngle));
        this.setRotate(this.minutehandTransform, shifter(minuteAngle));
        this.setRotate(this.hourhandTransform, shifter(hoursAngle));
        setInterval(() => {
            date = new Date();
            secAngle = 360 * date.getSeconds() / 60;
            minuteAngle = 360 * date.getMinutes() / 60;
            hoursAngle = 360 * date.getHours() / 12 + date.getMinutes() / 2;
            this.setRotate(this.secondhandTransform, shifter(secAngle));
            this.setRotate(this.minutehandTransform, shifter(minuteAngle));
            this.setRotate(this.hourhandTransform, shifter(hoursAngle));
        }, 1000);
    }

    setRotate(element: ElementRef, value: string): void {
        element.nativeElement.setAttribute('transform', `rotate(${value})`);
    }

    private makeMarks() {
        let marks = this.svg.nativeElement.querySelectorAll('line[mark]');
        if (marks && marks.length > 0) {
            for (let i = 0; i < marks.length; i++) {
                marks[i].remove();
            }
        }
        // make hour marks
        for (var i = 1; i <= 12; i++) {
            var el = this.document.createElementNS('http://www.w3.org/2000/svg', 'line');
            el.setAttribute('x1', this.diameter.toString());
            el.setAttribute('y1', (this.diameter * 0.3).toString());
            el.setAttribute('x2', this.diameter.toString());
            el.setAttribute('y2', (this.diameter * 0.4).toString());
            el.setAttribute('transform', 'rotate(' + (i * 360 / 12) + ` ${this.diameter} ${this.diameter})`);
            el.setAttribute('style', 'stroke: #ffffff;');
            el.setAttribute('mark', '');
            this.svg.nativeElement.appendChild(el);
        }

    }

}
