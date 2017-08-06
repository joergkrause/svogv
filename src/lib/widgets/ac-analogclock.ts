import {
    Component, Inject,
    Input, Output,
    EventEmitter,
    AfterViewInit, OnChanges, ViewChild, ElementRef, Renderer
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'ac-analogclock',
    styles: [`svg {
              display: block;
            }`],
    template: `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" 
     [attr.width]="diameter * 2" 
     [attr.height]="diameter * 2" #svg>
    <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feOffset in="blur" dx="2.5" dy="2.5"/>
    </filter>
    <g>
        <circle id="shadow" style="fill:rgba(0,0,0,0.1)" 
                [attr.cx]="diameter - 3" 
                [attr.cy]="diameter" 
                [attr.r]="diameter - 3" 
                filter="url(#innerShadow)"></circle>
        <circle id="circle" style="stroke: #FFF; stroke-width: 12px;" 
                [style.stroke-width]="diameter * 0.12"
                [attr.cx]="diameter" 
                [attr.cy]="diameter"
                [attr.fill]="bgColor" 
                [attr.r]="diameter - (diameter * 0.2)"></circle>
    </g>
    <g>
        <line [attr.x1]="diameter" [attr.y1]="diameter" 
              [attr.x2]="diameter" [attr.y2]="diameter * 0.55" transform="rotate(90 100 100)" 
              style="stroke-width: 4px; stroke: #fffbf9;" #hourhandTransform
              [style.stroke]="hourColor"
              >
        </line>
        <line [attr.x1]="diameter" [attr.y1]="diameter" 
              [attr.x2]="diameter" [attr.y2]="diameter * 0.40" transform="rotate(180 100 100)" 
              style="stroke-width: 3px; stroke: #fdfdfd;" #minutehandTransform
              [style.stroke]="minuteColor"
              >
        </line>
        <line [attr.x1]="diameter" [attr.y1]="diameter" 
              [attr.x2]="diameter" [attr.y2]="diameter * 0.30" transform="rotate(270 100 100)" 
              style="stroke-width: 2px; stroke: #C1EFED;" #secondhandTransform 
              [style.stroke]="secondColor"
              >
        </line>
    </g>
    <circle id="center" style="fill:#128A86; stroke: #C1EFED; stroke-width: 2px;" 
            [attr.cx]="diameter" [attr.cy]="diameter" r="3"></circle>
</svg>     
`
})
export class AcAnalogClock implements AfterViewInit, OnChanges {

    @Input() bgColor: string;
    @Input() secondColor = '#C1EFED';
    @Input() minuteColor = '#fdfdfd';
    @Input() hourColor = '#fffbf9';
    @Input() diameter: number;
    @Input() showSeconds: boolean;
    @Output() minuteClock: EventEmitter<Date>;
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
