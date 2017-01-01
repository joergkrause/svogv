import { Type, Component } from '@angular/core';
import { TreeNodeOptions } from './vm-treenodeoptions';

export interface TreeNodeBase {
    parent: TreeNodeBase;
    children: TreeNodeBase[];
    options: TreeNodeOptions;
    add(node: TreeNodeBase | TreeNodeBase[]): void;
    remove(node: TreeNodeBase): boolean;
    hasDirectAncestor(node: TreeNodeBase): boolean;
}
