import { ElementRef } from '@angular/core';

export enum CloseBehavior {
    Always,
    Disabled,
    OutsideClick,
    NonInput
}

export interface DropdownInterface {
    isOpen: boolean;
    keyboardNav: boolean;
    autoClose: CloseBehavior;
    toggleButtonElement: ElementRef;
    dropDownMenuItem: ElementRef;
    toggle(): void;
    focusToggleElement(): void;
    focusDropdownEntry(which: number): void;
    selectedOption: any;
}
