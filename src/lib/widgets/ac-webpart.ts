import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'ac-webpart',
    template: `<div class="box" [ngClass]="getDesign()">
                <div class="box-header">
                  <h3 class="box-title">{{ title }}</h3>
                  <div class="box-tools pull-right" *ngIf="showTools">
                    <button type="button" class="btn btn-box-tool" (click)="collapse()"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" (click)="remove()"><i class="fa fa-remove"></i></button>
                  </div>
                </div>
                <div class="box-body">
                    <ng-content></ng-content>
                </div>
                <div class="box-footer">{{ footer }}</div>
              </div>`
}) //
export class WebPart {
    @Input() title: string;
    @Input() colorclass: string;
    @Input() footer: string;
    @Input() showTools: boolean;
    @Input() solidHeader: boolean;

    constructor() {
        this.colorclass = "box-danger";
        this.title = "Demo";
        this.showTools = true;
    }

    getDesign(): any {
        let classes = {
            'box-solid': this.solidHeader
        };
        if (this.colorclass) {
            (<any>classes)[this.colorclass] = true;
        }
        return classes;
    }


}
