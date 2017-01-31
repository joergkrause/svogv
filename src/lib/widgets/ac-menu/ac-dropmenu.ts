import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AcMenu } from './models/ac-menu';
import { AcMenuItem } from './models/ac-menuitem';
import { AcMenuLinkItem } from './models/ac-menulinkitem';
import { Actions, Sizes } from '../../utils/enum-colors';
import { InputConverter, EnumConverter } from '../../utils/convert-inputconverter';

/**
 * The dropdown menu, button + drop  down/up and optional splitbutton
 */
@Component({
    selector: 'ac-dropmenu',
    template: `<div class="dropdown" dropdown [(isOpen)]="status.isOpen" [id]="id">
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
                    <button class="dropdown-item" type="button" (click)="selectItem(item)" *ngFor="let item of menu.children">{{item.text}}</button>
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

    @Input() hasSplitBtn: boolean = false;

    @Input() 
    @InputConverter(EnumConverter, Actions)
    btnType: Actions;

    @Input() 
    @InputConverter(EnumConverter, Sizes)
    btnSize: Sizes;

    @Input()
    disabled: boolean = false;

    @Input() id: string;    

    @Output() public onSelect:EventEmitter<AcMenuItem> = new EventEmitter<AcMenuItem>();

    public status: { isOpen: boolean, autoClose: boolean } = { isOpen: false, autoClose: false };

    constructor(private router: Router) {
        this.btnSize = Sizes.Medium;
        this.btnType = Actions.Secondary;
    }

    dropdownMenu($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isOpen = !this.status.isOpen;
    }

    selectItem(item: AcMenuItem): void {
        if (item instanceof AcMenuLinkItem){
            // invoke a navigation
            this.router.navigate((<AcMenuLinkItem>item).link);
        } else {
            // if no link invoke the onSelect event and return the selected item
            this.onSelect.emit(item);
        }
    }

}

