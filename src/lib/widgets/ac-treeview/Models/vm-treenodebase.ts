import { Type, Component } from '@angular/core';
import { AcTreeNodeOptions } from './vm-treenodeoptions';

export interface AcTreeNodeBase {
    parent: AcTreeNodeBase;
    children: AcTreeNodeBase[];
    options: AcTreeNodeOptions;
    add(node: AcTreeNodeBase | AcTreeNodeBase[]): void;
    remove(node: AcTreeNodeBase): boolean;
    hasDirectAncestor(node: AcTreeNodeBase): boolean;
}
