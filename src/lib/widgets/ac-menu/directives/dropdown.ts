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
    EventEmitter,
    Injectable
} from '@angular/core';
import { DropdownInterface, CloseBehavior } from '../services/ac-dropdowninterface';
import { DropdownService } from '../services/ac-dropdownservice';

@Injectable()
@Directive({ selector: '[dropdown]' })
export class Dropdown implements OnInit, OnDestroy, AfterViewInit, DropdownInterface {
    @HostBinding('class.open')
    @Input() public get isOpen(): boolean {
        return this._isOpen;
    }

    @Input() public autoClose: CloseBehavior;
    @Input() public keyboardNav: boolean;
    @Input() public appendToBody: boolean;

    @Output() public onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isOpen: boolean;
    // index of selected element
    public selectedOption: number;
    // drop menu html
    public menuEl: ElementRef;
    // drop down toggle element
    public toggleEl: ElementRef;
    @ContentChild('#dropdownMenu')
    dropDownMenuItem: ElementRef;

    constructor(public el: ElementRef,
        public dropDownService: DropdownService) {
    }

    public set isOpen(value) {
        this._isOpen = !!value;

        if (this.appendToBody && this.menuEl) {

        }

        if (this.isOpen) {
            this.focusToggleElement();
            this.dropDownService.open(this);
        } else {
            this.dropDownService.close(this);
            this.selectedOption = null;
        }
        this.onToggle.emit(this.isOpen);
        this.isOpenChange.emit(this.isOpen);
    }

    ngOnInit() {
        this.autoClose = CloseBehavior.NonInput;
        if (this.isOpen) {
        }
    }

    ngOnDestroy() {
        if (this.appendToBody && this.menuEl) {
            this.menuEl.nativeElement.remove();
        }
    }

    ngAfterViewInit() {
        this.dropDownMenu = this.dropDownMenuItem;
    }

    public set dropDownMenu(dropdownMenu: ElementRef) {
        // init drop down menu
        this.menuEl = dropdownMenu;

        if (this.appendToBody) {
            window.document.body.appendChild(this.menuEl.nativeElement);
        }
    }

    public set dropDownToggle(dropdownToggle: ElementRef) {
        // init toggle element
        this.toggleEl = dropdownToggle;
    }

    public toggle(open?: boolean): boolean {
        this.isOpen = arguments.length ? !!open : !this.isOpen;
        return this.isOpen;
    }

    public focusDropdownEntry(keyCode: number) {
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
