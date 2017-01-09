import { Component, Input, Output, OnChanges, OnInit,OnDestroy, 
         EventEmitter, Directive, Query, QueryList,
         Host, HostListener, HostBinding, ElementRef } from '@angular/core';
import { AcMenu } from './models/ac-menu';
import { AcMenuItem } from './models/ac-menuitem';
import { Actions, Sizes } from '../../utils/enum-colors';
import { InputConverter, EnumConverter } from '../../utils/convert-inputconverter';

export interface DropdownMenuInterface {
    el: ElementRef;
    templateUrl: string;
}

export interface DropdownToggleInterface {
    el: ElementRef;
}

export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';
export const NONINPUT = 'nonInput';

/**
 * The dropdown menu, button + drop  down/up and optional splitbutton
 */
@Component({
    selector: 'ac-dropmenu',
    template: `<div class="dropdown" dropdown [(isOpen)]="status.isOpen" keyboardNav="keyboardNav">
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
                    <button class="dropdown-item" type="button" (click)="selectItem(menu)" *ngFor="let item in menu">{{item.text}}</a>
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

@Directive({selector: '[dropdown]'})
export class Dropdown implements OnInit, OnDestroy {
    @HostBinding('class.open')
    @Input() public get isOpen():boolean {
        return this._isOpen;
    }

    @Input() public autoClose:string;
    @Input() public keyboardNav:boolean;
    @Input() public appendToBody:boolean;

    @Output() public onToggle:EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public isOpenChange:EventEmitter<boolean> = new EventEmitter<boolean>();
    @HostBinding('class.dropdown') private addClass = true;

    private _isOpen:boolean;
    // index of selected element
    public selectedOption:number;
    // drop menu html
    public menuEl:ElementRef;
    // drop down toggle element
    public toggleEl:ElementRef;

    constructor(public el:ElementRef,
                @Query('dropdownMenu', {descendants: false}) dropdownMenuList:QueryList<ElementRef>) {
     }

    public set isOpen(value) {
        this._isOpen = !!value;

         if (this.appendToBody && this.menuEl) {

        }

         if (this.isOpen) {
            this.focusToggleElement();
            dropdownService.open(this);
        } else {
            dropdownService.close(this);
            this.selectedOption = null;
        }
        this.onToggle.emit(this.isOpen);
        this.isOpenChange.emit(this.isOpen);
     }

    ngOnInit() {
        this.autoClose = this.autoClose || NONINPUT;
        if (this.isOpen) {
         }
    }

    ngOnDestroy() {
        if (this.appendToBody && this.menuEl) {
            this.menuEl.nativeElement.remove();
        }
    }

    public set dropDownMenu(dropdownMenu:{el:ElementRef}) {
        // init drop down menu
        this.menuEl = dropdownMenu.el;

        if (this.appendToBody) {
            window.document.body.appendChild(this.menuEl.nativeElement);
        }
    }

    public set dropDownToggle(dropdownToggle:{el:ElementRef}) {
        // init toggle element
        this.toggleEl = dropdownToggle.el;
    }

    public toggle(open?:boolean):boolean {
        return this.isOpen = arguments.length ? !!open : !this.isOpen;
    }

    public focusDropdownEntry(keyCode:number) {
        // If append to body is used.
        let hostEl = this.menuEl ?
            this.menuEl.nativeElement :
            this.el.nativeElement.getElementsByTagName('ul')[0];

        if (!hostEl) {
             return;
        }

        let elems = hostEl.getElementsByTagName('a');
        if (!elems || !elems.length) {
             return;
        }

         switch (keyCode) {
            case (40):
                if (typeof this.selectedOption !== 'number') {
                    this.selectedOption = 0;
                    break;
                }

                if (this.selectedOption === elems.length - 1) {
                    break;
                }

                this.selectedOption++;
                break;
            case (38):
                if (typeof this.selectedOption !== 'number') {
                    return;
                }

                if (this.selectedOption === 0) {
                    // todo: return?
                    break;
                }

                this.selectedOption--;
                break;
        }

        elems[this.selectedOption].focus();
    }

    public focusToggleElement() {
        if (this.toggleEl) {
            this.toggleEl.nativeElement.focus();
        }
    }
}

@Directive({ selector: '[dropdownMenu]' })
export class DropdownMenu implements OnInit {
    constructor( @Host() public dropdown: Dropdown, public el: ElementRef) {
    }

    public ngOnInit() {
        this.dropdown.dropDownMenu = this;
    }
}


@Directive({ selector: '[dropdownToggle]' })
export class DropdownToggle implements OnInit {
    @HostBinding('class.disabled')
    @Input() private disabled:boolean = false;

    @HostBinding('class.dropdown-toggle')
    @HostBinding('attr.aria-haspopup')
    private addClass = true;

    constructor(@Host() public dropdown:AcDropMenu, public el:ElementRef) {
    }

    public ngOnInit() {
        this.dropdown.dropDownToggle = this;
    }

    @HostBinding('attr.aria-expanded')
    public get isOpen() {
        return this.dropdown.status.isOpen;
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event:MouseEvent) {
        event.stopPropagation();

        if (!this.disabled) {
            this.dropdown.toggle();
        }
        return false;
    }
}

@Directive({
    selector: '[dropdown][dropdownKeyboardNav]',
    host: {
        '(keydown)': 'onKeydown($event)'
    }
})
export class KeyboardNav {
    constructor(private dd:Dropdown, private el:ElementRef) {
        console.warn('keyboard-nav deprecated');
        dd.keyboardNav = true;
    }

    onKeydown(event:KeyboardEvent) {
        if (event.which !== 40 && event.which !== 38) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        let elems = this.dd.menuEl.nativeElement.getElementsByTagName('a');

        switch (event.which) {
            case (40):
                if (typeof this.dd.selectedOption !== 'number') {
                    this.dd.selectedOption = 0;
                    break;
                }

                if (this.dd.selectedOption === elems.length - 1) {
                    break;
                }

                this.dd.selectedOption++;
                break;
            case (38):
                if (typeof this.dd.selectedOption !== 'number') {
                    return;
                }

                if (this.dd.selectedOption === 0) {
                    // todo: return?
                    break;
                }

                this.dd.selectedOption--;
                break;
        }
        elems[this.dd.selectedOption].nativeElement.focus();
    }
}
