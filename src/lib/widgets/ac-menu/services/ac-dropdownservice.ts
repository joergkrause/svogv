import { Injectable } from '@angular/core';
import { DropdownInterface, CloseBehavior } from './ac-dropdowninterface';


@Injectable()
export class DropdownService {
    private openScope: DropdownInterface;
    private dropdownScope: DropdownInterface;

    private closeDropdownBind: EventListener = this.closeDropdown.bind(this);
    private keybindFilterBind: EventListener = this.keybindFilter.bind(this);

    public open(dropdownScope: DropdownInterface) {
        if (!this.openScope) {
            window.document.addEventListener('click', this.closeDropdownBind);
            window.document.addEventListener('keydown', this.keybindFilterBind);
        }

        if (this.openScope && this.openScope !== this.dropdownScope) {
            this.openScope.isOpen = false;
        }

        this.openScope = dropdownScope;
    }

    public close(dropdownScope: DropdownInterface) {
        if (this.openScope !== dropdownScope) {
            return;
        }

        this.openScope = null;
        window.document.removeEventListener('click', this.closeDropdownBind);
        window.document.removeEventListener('keydown', this.keybindFilterBind);
    }

    private closeDropdown(event: MouseEvent) {
        if (!this.openScope) {
            return;
        }

        if (event && this.openScope.autoClose === CloseBehavior.Disabled) {
            return;
        }

        if (event && this.openScope.toggleEl &&
            this.openScope.toggleEl.nativeElement === event.target) {
            return;
        }

        if (event && this.openScope.autoClose === CloseBehavior.NonInput &&
            this.openScope.menuEl &&
            /input|textarea/i.test((<any>event.target).tagName) &&
            this.openScope.menuEl.nativeElement.contains(event.target)) {
            return;
        }

        if (event && this.openScope.autoClose === CloseBehavior.OutsideClick &&
            this.openScope.menuEl &&
            this.openScope.menuEl.nativeElement.contains(event.target)) {
            return;
        }

        this.openScope.isOpen = false;
    }

    private keybindFilter(event: KeyboardEvent) {
        if (event.which === 27) {
            this.openScope.focusToggleElement();
            this.closeDropdown(null);
            return;
        }

        if (this.openScope.keyboardNav && this.openScope.isOpen &&
            (event.which === 38 || event.which === 40)) {
            event.preventDefault();
            event.stopPropagation();
            this.openScope.focusDropdownEntry(event.which);
        }
    }
}