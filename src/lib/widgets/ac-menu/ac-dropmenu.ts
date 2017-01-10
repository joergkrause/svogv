﻿import { Component, Input, Output, OnChanges, OnInit,OnDestroy, 
         EventEmitter, Directive, ContentChildren, QueryList,
         Host, HostListener, HostBinding, ElementRef } from '@angular/core';
import { AcMenu } from './models/ac-menu';
import { AcMenuItem } from './models/ac-menuitem';
import { Actions, Sizes } from '../../utils/enum-colors';
import { InputConverter, EnumConverter } from '../../utils/convert-inputconverter';
import { DropdownService } from './services/ac-dropdownservice';
import { DropdownInterface, CloseBehavior } from './services/ac-dropdowninterface';


/**
 * The dropdown menu, button + drop  down/up and optional splitbutton
 */
@Component({
    selector: 'ac-dropmenu',
    template: `<div class="dropdown" dropdown [(isOpen)]="status.isOpen" [keyboardNav]="keyboardNav" [id]="id">
                <button type="button" dropdownToggle class="btn" [ngClass]="btnType" [ngClass]="btnSize" *ngIf="hasSplitBtn" 
                        (click)="dropdownMenu($event)">{{ text }}</button>
                <button class="btn dropdown-toggle" dropdownToggle [ngClass]="btnType" [ngClass]="btnSize" *ngIf="!hasSplitBtn"
                        type="button" 
                        (click)="dropdownMenu($event)"
                        aria-haspopup="true" aria-expanded="false">
                    {{ text }}
                </button>
                <button class="btn dropdown-toggle" dropdownToggle [ngClass]="btnType" [ngClass]="btnSize" *ngIf="hasSplitBtn"
                        type="button" 
                        (click)="dropdownMenu($event)"
                        aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button class="dropdown-item" type="button" (click)="selectItem(menu)" *ngFor="let item in menu">{{item.text}}</button>
                </div>
                </div>`})
export class AcDropMenu {
    /**
     * Drop down data
     */
    @Input() menu: AcMenu;
    /** 
     * Button Text 
     * */
    @Input() text: string;

    @Input() keyboardNav: boolean = false;
    @Input() hasSplitBtn: boolean = true;

    @Input() 
    @InputConverter(EnumConverter)
    btnType: Actions;

    @Input() 
    @InputConverter(EnumConverter)
    btnSize: Sizes;

    @Input()
    disabled: boolean = false;

    @Input() id: string;    

    public status: { isOpen: boolean, autoClose: boolean } = { isOpen: false, autoClose: false };

    constructor() {
        this.btnSize = Sizes.Medium;
        this.btnType = Actions.Secondary;
    }

     private dropdownMenu($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isOpen = !this.status.isOpen;
    }

    selectItem(item: AcMenuItem): void {
        // TODO: Add EventEmitter
    }

}

