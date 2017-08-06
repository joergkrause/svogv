import {
    Directive,
    ElementRef,
    HostBinding,
    ContentChild,
    OnInit,
    OnDestroy,
    AfterViewInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { DropdownInterface, CloseBehavior } from '../services/ac-dropdowninterface';
import { DropdownService } from '../services/ac-dropdownservice';

@Directive({ selector: '[dropdown]' })
export class Dropdown implements OnInit, OnDestroy, AfterViewInit, DropdownInterface {

    /**
     * Click outside or Escape (if keyboardNav is being set) will close.
     */
    @Input() public autoClose: CloseBehavior;
    /**
     * Support keys (up/down arrow and escape)
     */
    @Input() public keyboardNav: boolean;
    /**
     * Put the drop HTML to body instead of element, might be required for some custom css.
     */
    @Input() public appendToBody: boolean;
    /**
     * Fired on toggle with current state
     */
    @Output() public onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isOpen: boolean;
    /**
     * Index of selected element
     */
    public selectedOption: number;

    /**
     * The button that actually toggles
     */
    public toggleButtonElement: ElementRef;
    /**
     * The dropdown part's HTML
     */
    @ContentChild('dropdownMenu')
    dropDownMenuItem: ElementRef;

    constructor(public el: ElementRef,
        public dropDownService: DropdownService) {
    }

    @HostBinding('class.show')
    @Input() public get isOpen(): boolean {
        console.log('Return current open state: ' + this._isOpen);
        return this._isOpen;
    }
    public set isOpen(value) {
        console.log('Set current open state: ' + value);
        this._isOpen = !!value;

        if (this.isOpen) {
            this.focusToggleElement();
            this.dropDownService.open(this);
        } else {
            this.dropDownService.close(this);
            this.selectedOption = null;
        }
        this.onToggle.emit(this.isOpen);
    }

    ngOnInit() {
        this.autoClose = CloseBehavior.NonInput;
    }

    ngOnDestroy() {
        if (this.appendToBody && this.dropDownMenuItem) {
            this.dropDownMenuItem.nativeElement.remove();
        }
    }

    ngAfterViewInit() {
        if (this.appendToBody) {
            window.document.body.appendChild(this.dropDownMenuItem.nativeElement);
        }
    }

    /**
     * Set the drop down externally.
     */
    public set dropDownMenu(dropdownMenu: ElementRef) {
        // init drop down menu
        this.dropDownMenuItem = dropdownMenu;
    }

    /**
     * The the actual toggle button externally.
     */
    public set dropDownToggle(dropdownToggle: ElementRef) {
        // init toggle element
        this.toggleButtonElement = dropdownToggle;
    }

    public toggle(open?: boolean): boolean {
        this.isOpen = arguments.length ? !!open : !this.isOpen;
        console.log('Toggle on Host: ' + this.isOpen);
        return this.isOpen;
    }

    public focusDropdownEntry(keyCode: number) {
        // If append to body is used.
        let hostEl = this.dropDownMenuItem ?
            this.dropDownMenuItem.nativeElement :
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
        if (this.toggleButtonElement) {
            this.toggleButtonElement.nativeElement.focus();
        }
    }
}
