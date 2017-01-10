import { Directive, ElementRef, Host, HostBinding, HostListener, OnInit, Input } from '@angular/core';
import { DropdownInterface, DropdownMenuInterface } from '../services/ac-dropdowninterface';

@Directive({ selector: '[dropdownMenu]' })
export class DropdownMenu implements OnInit, DropdownMenuInterface {
    constructor( @Host() public dropdown: DropdownInterface, public el: ElementRef) {
    }

    public ngOnInit() {
        this.dropdown.dropDownMenu = this;
    }
}
