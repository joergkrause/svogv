import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

/**
 * A circling symbol with various settings to control speed and color.
 */
@Component({
    selector: 'ac-loadericon',
    templateUrl: 'ac-loadericon.component.html'
})
export class AcLoaderIcon implements AfterViewInit {

    /**
     * <animateTransform attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                begin="0s"
                [attr.dur]="rotateSpeed + 's'"
                repeatCount="indefinite"
            />
     */

    /**
     * The speed in second per rotation. Fractions are allowed. 10 = very slow, 0.5 = really fast.
     */
    @Input() rotateSpeed: number;
    /**
     * The color. The colors range from white to this value.
     */
    @Input() color: string;

    @ViewChild('group') group: ElementRef;

    constructor() {
        this.rotateSpeed = 1;
        this.color = '#FF0000';
    }

    ngAfterViewInit(): void {
        let native = this.group.nativeElement as SVGGElement;
        let x = 0;
        let y = 12;
        setInterval(() => {
            for (let i = 0; i < native.children.length; i++, y--) {
                x = (y - i) * 30 - 360;
                native.children[i].setAttribute('transform', `rotate(${x} 18 18)`);
                if (y === 12) {
                    y = 0;
                }
            }
        }, (100 / this.rotateSpeed * 13));
    }
}
