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
                <button type="button" dropdownToggle class="btn" 
                        id="dropdownMenuButton"
                        aria-haspopup="true" aria-expanded="false"
                       [ngClass]="btnType" [ngClass]="btnSize" *ngIf="hasSplitBtn" 
                        >{{ text }}</button>
                <button class="btn dropdown-toggle" dropdownToggle 
                        aria-haspopup="true" aria-expanded="false"
                       [ngClass]="btnType" [ngClass]="btnSize" *ngIf="!hasSplitBtn"
                        type="button" 
                        >
                    {{ text }}
                </button>
                <button class="btn dropdown-toggle" dropdownToggle                         
                        aria-haspopup="true" aria-expanded="false"
                       [ngClass]="btnType" [ngClass]="btnSize" *ngIf="hasSplitBtn"
                        type="button" >
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" #dropDownMenu>
                    <button class="dropdown-item" type="button" (click)="selectItem(item)" 
                            *ngFor="let item of menu.children">{{item.text}}</button>
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
    /**
     * The button has split button behavior.
     */
    @Input() hasSplitBtn = false;
    /**
     * The type of button. See the Actions enum for details.
     */
    @Input()
    @InputConverter(EnumConverter, Actions)
    btnType: Actions;
    /**
     * The size of the button. See the Sizes enum for details.
     */
    @Input()
    @InputConverter(EnumConverter, Sizes)
    btnSize: Sizes;
    /**
     * Disable / Enable the whole button.
     */
    @Input()
    disabled = false;
    /**
     * Id for use with label element.
     */
    @Input() id: string;
    /**
     * Event fired if no router is present and one want to execute custom action.
     */
    @Output() public onSelect: EventEmitter<AcMenuItem> = new EventEmitter<AcMenuItem>();

    public status: { isOpen: boolean, autoClose: boolean } = { isOpen: false, autoClose: false };

    constructor(private router?: Router) {
        this.btnSize = Sizes.Medium;
        this.btnType = Actions.Secondary;
    }

    selectItem(item: AcMenuItem): void {
        if (item instanceof AcMenuLinkItem && this.router) {
            // invoke a navigation
            this.router.navigate((<AcMenuLinkItem>item).link);
        } else {
            if (!this.onSelect) {
                throw new Error('If no router is present you must add the onSelect event.');
            }
            // if no link invoke the onSelect event and return the selected item
            this.onSelect.emit(item);
        }
    }

}

