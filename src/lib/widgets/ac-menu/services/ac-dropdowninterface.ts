import { ElementRef } from '@angular/core';

export enum CloseBehavior {
    Always,
    Disabled,
    OutsideClick,
    NonInput
}


export interface DropdownMenuInterface {
}

export interface DropdownToggleInterface {
}

export interface DropdownInterface {
    menuEl: ElementRef;
    isOpen: boolean;
    keyboardNav: boolean;
    autoClose: CloseBehavior;
    toggleEl: ElementRef;
    dropDownToggle: DropdownToggleInterface;
    dropDownMenu: DropdownMenuInterface;
    toggle() : void;
    focusToggleElement(): void;
    focusDropdownEntry(which: number): void;    
    selectedOption: any;
}