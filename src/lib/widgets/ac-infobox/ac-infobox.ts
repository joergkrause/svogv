import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { InputConverter, BooleanConverter } from '../../decorators/convert-inputconverter';
import { InfoBoxOptions } from './Models/options-infobox';
import { Colors } from './Models/enum-colors';

@Component({
    selector: 'ac-infobox',
    template: `<div class="card card-inverse card-success">
                    <div class="card-block bg-success" [ngClass]="color">
                        <div class="rotate">
                            <i class="fa fa-5x" [ngClass]="icon"></i>
                        </div>
                        <h6 class="text-uppercase">{{ text }}</h6>
                        <h1 class="display-1">{{ number }}</h1>
                        <div class="progress" *ngIf="options.hasProgress">
                           <div class="progress-bar" [style.width]="progressValue"></div>
                        </div>
                        <span class="progress-description" *ngIf="options.hasProgress">
                            {{progressText}}
                        </span>
                    </div>
                 </div>`
}) //
export class AcInfoBox {
    @Input() icon: string;
    @Input() text: string;
    @Input() number: string;
    @Input() footerText: string;
    @Input() footerLink: string;
    @Input() progressValue: number;
    @Input() progressText: string;
    @Input() color: string;

    @Input() options: InfoBoxOptions;

    constructor() {
        this.color = "bg-yellow";
        this.text = "Demo";
        this.progressValue = 70;
        this.progressText = "Some Progress";
        this.icon = "fa-user";
        this.options = new InfoBoxOptions();
    }


}


