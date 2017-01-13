import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { InputConverter, EnumConverter } from '../../utils/convert-inputconverter';
import { AcInfoBoxOptions } from './Models/options-infobox';
import { Meaning } from '../../utils/enum-colors';

@Component({
    selector: 'ac-infobox',
    template: `<div class="card card-inverse" [ngClass]="getColor('card')">
                  <div class="card-block" [ngClass]="getColor('bg')">
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
    @Input() 
    @InputConverter(EnumConverter, Meaning) // need EnumConverter, as otherwise metadata returns Number
    color?: Meaning;

    @Input() options: AcInfoBoxOptions;

    constructor() {
        this.color = Meaning.Info;
        this.text = "Demo";
        this.progressValue = 0;
        this.progressText = "";
        this.icon = "fa-user";
        this.options = new AcInfoBoxOptions();
    }


    private getColor(type: string) : string {
        if (this.color){
            let color : string = (<string>EnumConverter(this.color, Meaning)).toLowerCase();
            return `${type}-${color}`; 
        }
    }

}


