import { Type, Component } from '@angular/core';

/** The state of node */
export enum AcTreeNodeState {
    undefined = 0,
    checked = 1 << 0,
    disabled = 1 << 1,
    expanded = 1 << 2,
    selected = 1 << 3
}

/** The view options of node */
export class AcTreeNodeOptions {
    /** Show the expand icons */
    collapsable: boolean;
    /** An additional icon, must be a fontawesome class */
    icon: string;
    /** An additional icon's primary color */
    iconColor: string;
    /** An additional icon on select */
    selectedIcon: string;
    /** Text color */
    color: string;
    /** backColor */
    backColor: string;
    /** A hyperlink */
    href: string;
    /** Node can be selected */
    selectable: boolean;
    /** Node can be checked */
    checkable: boolean;

    constructor(options?: AcTreeNodeOptions) {
        if (options) {
            //TODO: make type safe
            //for (let k in options) this[k] = options[k];
        }
    }
}
