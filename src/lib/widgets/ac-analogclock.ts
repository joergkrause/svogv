import { Component, Inject, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'ac-analogclock',
    styles: [`svg {
              display: block;
            }`],
    template: `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200" #svg>
    <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feOffset in="blur" dx="2.5" dy="2.5"/>
    </filter>
    <g>
        <circle id="shadow" style="fill:rgba(0,0,0,0.1)" cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle>
        <circle id="circle" style="stroke: #FFF; stroke-width: 12px;" cx="100" [style.fill]="bgColor" cy="100" r="80"></circle>
    </g>
    <g>
        <line x1="100" y1="100" x2="100" y2="55" transform="rotate(90 100 100)" style="stroke-width: 4px; stroke: #fffbf9;" id="hourhand">
            <animatetransform attributeName="transform"
                              #hourhandTransform
                              attributeType="XML"
                              type="rotate"
                              dur="43200s" from="0 100 100" to="360 100 100"
                              repeatCount="indefinite"/>
        </line>
        <line x1="100" y1="100" x2="100" y2="40" transform="rotate(180 100 100)" style="stroke-width: 3px; stroke: #fdfdfd;" id="minutehand">
            <animatetransform attributeName="transform"
                              #minutehandTransform
                              attributeType="XML"
                              type="rotate"
                              dur="3600s" from="0 100 100" to="360 100 100"
                              repeatCount="indefinite"/>
        </line>
        <line x1="100" y1="100" x2="100" y2="30" transform="rotate(270 100 100)" style="stroke-width: 2px; stroke: #C1EFED;" id="secondhand" >
            <animatetransform attributeName="transform"
                              #secondhandTransform
                              attributeType="XML"
                              type="rotate"
                              dur="60s" from="0 100 100" to="360 100 100"
                              repeatCount="indefinite"/>
        </line>
    </g>
    <circle id="center" style="fill:#128A86; stroke: #C1EFED; stroke-width: 2px;" cx="100" cy="100" r="3"></circle>
</svg>
`
})
export class AcAnalogClock implements AfterViewInit {

    @Input() bgColor: string;
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
        this.bgColor = "#92345";
    }

    ngAfterViewInit() {
        // make hour marks
        for (var i = 1; i <= 12; i++) {
            var el = this.document.createElementNS('http://www.w3.org/2000/svg', 'line');
            el.setAttribute('x1', '100');
            el.setAttribute('y1', '30');
            el.setAttribute('x2', '100');
            el.setAttribute('y2', '40');
            el.setAttribute('transform', 'rotate(' + (i * 360 / 12) + ' 100 100)');
            el.setAttribute('style', 'stroke: #ffffff;');
            this.svg.nativeElement.appendChild(el);
        }
        // base area
        let cx : number = 100;
        let cy: number = 100;
        // create animation string
        // let shifter = (val:number) => [val, cx, cy].join(' ');
        // // from real time
        // let date = new Date();
        // let hoursAngle: number = 360 * date.getHours() / 12 + date.getMinutes() / 2;
        // let minuteAngle: number = 360 * date.getMinutes() / 60;
        // let secAngle: number = 360 * date.getSeconds() / 60;
        // // assign animation flow
        // this.secondhandTransform.nativeElement.setAttribute('from', shifter(secAngle));
        // this.secondhandTransform.nativeElement.setAttribute('to', shifter(secAngle + 360));
        // this.minutehandTransform.nativeElement.setAttribute('from', shifter(minuteAngle));
        // this.minutehandTransform.nativeElement.setAttribute('to', shifter(minuteAngle + 360));
        // this.hourhandTransform.nativeElement.setAttribute('from', shifter(hoursAngle));
        // this.hourhandTransform.nativeElement.setAttribute('to', shifter(hoursAngle + 360));
    }

}