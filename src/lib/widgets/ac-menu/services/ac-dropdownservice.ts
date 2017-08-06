import { Injectable } from '@angular/core';
import { DropdownInterface, CloseBehavior } from './ac-dropdowninterface';

/**
 * Manage behavior of events triggered outside
 */
@Injectable()
export class DropdownService {
    private openScopeElement: DropdownInterface;

    private closeDropdownBind: EventListener = this.closeDropdown.bind(this);
    private keybindFilterBind: EventListener = this.keybindFilter.bind(this);

    public open(dropdownScope: DropdownInterface) {
        if (!this.openScopeElement) {
            window.document.addEventListener('click', this.closeDropdownBind);
            window.document.addEventListener('keydown', this.keybindFilterBind);
        }

        this.openScopeElement = dropdownScope;
    }

    public close(dropdownScope: DropdownInterface) {
        if (this.openScopeElement !== dropdownScope) {
            return;
        }

        this.openScopeElement = null;
        window.document.removeEventListener('click', this.closeDropdownBind);
        window.document.removeEventListener('keydown', this.keybindFilterBind);
    }

    private closeDropdown(event: MouseEvent) {
        if (!this.openScopeElement) {
            return;
        }

        if (event && this.openScopeElement.autoClose === CloseBehavior.Disabled) {
            return;
        }

        if (event && this.openScopeElement.toggleButtonElement &&
            this.openScopeElement.toggleButtonElement.nativeElement === event.target) {
            return;
        }

        if (event && this.openScopeElement.autoClose === CloseBehavior.NonInput &&
            this.openScopeElement.dropDownMenuItem &&
            /input|textarea/i.test((<any>event.target).tagName) &&
            this.openScopeElement.dropDownMenuItem.nativeElement.contains(event.target)) {
            return;
        }

        if (event && this.openScopeElement.autoClose === CloseBehavior.OutsideClick &&
            this.openScopeElement.dropDownMenuItem &&
            this.openScopeElement.dropDownMenuItem.nativeElement.contains(event.target)) {
            return;
        }

        this.openScopeElement.isOpen = false;
    }

    private keybindFilter(event: KeyboardEvent) {
        // Escape
        if (event.which === 27) {
            this.openScopeElement.focusToggleElement();
            this.closeDropdown(null);
            return;
        }
        // Arrow keys
        if (this.openScopeElement.keyboardNav && this.openScopeElement.isOpen &&
            (event.which === 38 || event.which === 40)) {
            event.preventDefault();
            event.stopPropagation();
            this.openScopeElement.focusDropdownEntry(event.which);
        }
    }
}